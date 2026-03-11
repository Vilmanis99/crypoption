/**
 * WordPress XML Export Parser
 * Run with: node scripts/parse-wordpress.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { XMLParser } from 'fast-xml-parser'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const XML_FILE = resolve(ROOT, 'crypoptionhub.WordPress.2026-03-11.xml')
const OUT_DIR = resolve(ROOT, 'src/data')

mkdirSync(OUT_DIR, { recursive: true })

console.log('Parsing WordPress XML export...')
const xml = readFileSync(XML_FILE, 'utf-8')

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  textNodeName: '__text',
  isArray: (name) =>
    ['item', 'wp:postmeta', 'wp:termmeta', 'category', 'wp:category', 'wp:tag', 'wp:author'].includes(name),
  parseTagValue: false,
  trimValues: true,
})

const result = parser.parse(xml)
const channel = result.rss.channel

// ─── Helpers ────────────────────────────────────────────────────────────────

function cdata(val) {
  if (!val) return ''
  if (typeof val === 'object' && val.__cdata !== undefined) return String(val.__cdata)
  if (typeof val === 'object' && val.__text !== undefined) return String(val.__text)
  return String(val)
}

function getMeta(postmetas, key) {
  if (!postmetas) return ''
  const found = postmetas.find((m) => cdata(m['wp:meta_key']) === key)
  return found ? cdata(found['wp:meta_value']) : ''
}

function getCategories(cats, domain) {
  if (!cats) return []
  return cats
    .filter((c) => c['@_domain'] === domain)
    .map((c) => cdata(c.__cdata || c.__text || c))
}

function rewriteImageUrls(str) {
  if (!str) return str
  return str.replace(
    /https:\/\/crypoptionhub\.com\/wp-content\/uploads\//g,
    '/images/'
  )
}

// Rewrite internal links: https://crypoptionhub.com/slug/ → /slug/
function rewriteInternalLinks(str) {
  if (!str) return str
  return str.replace(
    /https:\/\/crypoptionhub\.com\/((?!wp-content|wp-json|wp-admin)[^"'\s]*)/g,
    '/$1'
  )
}

// ─── TablePress: parse JSON arrays → HTML tables ──────────────────────────────

function tableRowsToHtml(rows) {
  if (!rows || rows.length === 0) return ''
  const [header, ...body] = rows
  const clean = (cell) => rewriteInternalLinks(rewriteImageUrls(cell))
  const thead = `<thead><tr>${header.map(cell => `<th>${clean(cell)}</th>`).join('')}</tr></thead>`
  const tbody = body.map(row =>
    `<tr>${row.map(cell => `<td>${clean(cell)}</td>`).join('')}</tr>`
  ).join('')
  return `<div class="tablepress-wrap"><table class="tablepress"><${thead}<tbody>${tbody}</tbody></table></div>`
}

// Build tableId → html map from tablepress_table items
const tableMap = {}
const items = channel.item || []

for (const item of items) {
  if (cdata(item['wp:post_type']) !== 'tablepress_table') continue
  const postmeta = item['wp:postmeta'] || []
  const tableId = getMeta(postmeta, '_tablepress_export_table_id')
  if (!tableId) continue
  const rawContent = cdata(item['content:encoded'])
  try {
    // TablePress stores data as JSON: [[row1cells], [row2cells], ...]
    // Wrapped in an extra array: [[[...rows]]]
    let parsed = JSON.parse(rawContent)
    // Unwrap extra nesting if present
    while (Array.isArray(parsed) && Array.isArray(parsed[0]) && Array.isArray(parsed[0][0])) {
      parsed = parsed[0]
    }
    tableMap[tableId] = tableRowsToHtml(parsed)
    console.log(`  ✓ Table ${tableId} (${parsed.length} rows)`)
  } catch {
    console.warn(`  ✗ Table ${tableId}: failed to parse JSON`)
  }
}

// Replace [table id=X /] shortcodes in content with rendered HTML
function inlineTables(content) {
  return content.replace(/\[table id=(\d+) \/\]/g, (match, id) => {
    return tableMap[id] || `<!-- table ${id} not found -->`
  })
}

// ─── Authors ─────────────────────────────────────────────────────────────────

const authors = (channel['wp:author'] || []).map((a) => ({
  id: cdata(a['wp:author_id']),
  login: cdata(a['wp:author_login']),
  email: cdata(a['wp:author_email']),
  displayName: cdata(a['wp:author_display_name']),
  firstName: cdata(a['wp:author_first_name']),
  lastName: cdata(a['wp:author_last_name']),
}))

// ─── Categories ───────────────────────────────────────────────────────────────

const categories = (channel['wp:category'] || []).map((c) => ({
  id: cdata(c['wp:term_id']),
  slug: cdata(c['wp:category_nicename']),
  parent: cdata(c['wp:category_parent']),
  name: cdata(c['wp:cat_name']),
  description: cdata(c['wp:category_description']),
}))

// ─── Build attachment map ─────────────────────────────────────────────────────

const attachments = {}
for (const item of items) {
  if (cdata(item['wp:post_type']) !== 'attachment') continue
  const id = cdata(item['wp:post_id'])
  const url = cdata(item['wp:attachment_url'])
  if (id && url) attachments[id] = url
}

// ─── Posts & Pages ───────────────────────────────────────────────────────────

const posts = []
const pages = []

for (const item of items) {
  const postType = cdata(item['wp:post_type'])
  const status = cdata(item['wp:status'])

  if (!['post', 'page'].includes(postType)) continue
  if (status !== 'publish') continue

  const postmeta = item['wp:postmeta'] || []
  const cats = item.category || []

  const thumbnailId = getMeta(postmeta, '_thumbnail_id')
  const featuredImage = thumbnailId ? (attachments[thumbnailId] || '') : ''
  const language = getCategories(cats, 'language')[0]?.toLowerCase() || 'en'

  const rawContent = cdata(item['content:encoded'])
  const content = rewriteInternalLinks(inlineTables(rewriteImageUrls(rawContent)))

  const entry = {
    id: cdata(item['wp:post_id']),
    slug: cdata(item['wp:post_name']),
    link: cdata(item.link),
    title: cdata(item.title),
    content,
    excerpt: cdata(item['excerpt:encoded']),
    date: cdata(item['wp:post_date_gmt']),
    modified: cdata(item['wp:post_modified_gmt']),
    author: cdata(item['dc:creator']),
    language,
    categories: getCategories(cats, 'category'),
    tags: getCategories(cats, 'post_tag'),
    featuredImage: rewriteImageUrls(featuredImage),
    seo: {
      title: getMeta(postmeta, 'rank_math_title'),
      description: getMeta(postmeta, 'rank_math_description'),
      focusKeyword: getMeta(postmeta, 'rank_math_focus_keyword'),
    },
  }

  if (postType === 'post') posts.push(entry)
  else pages.push(entry)
}

// ─── Write output ─────────────────────────────────────────────────────────────

function write(filename, data) {
  const path = resolve(OUT_DIR, filename)
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`  ✓ ${filename} (${Array.isArray(data) ? data.length + ' items' : 'object'})`)
}

write('posts.json', posts)
write('pages.json', pages)
write('categories.json', categories)
write('authors.json', authors)
write('attachments.json', Object.entries(attachments).map(([id, url]) => ({ id, url: rewriteImageUrls(url) })))

console.log(`\nDone!  Posts: ${posts.length}  Pages: ${pages.length}  Tables: ${Object.keys(tableMap).length}`)
const enPosts = posts.filter(p => p.language === 'en')
const ruPosts = posts.filter(p => p.language === 'ru')
console.log(`EN posts: ${enPosts.length}  RU posts: ${ruPosts.length}`)
