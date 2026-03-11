import { readFileSync } from 'fs'
import { XMLParser } from 'fast-xml-parser'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const xml = readFileSync(resolve(ROOT, 'crypoptionhub.WordPress.2026-03-11.xml'), 'utf-8')

const parser = new XMLParser({
  ignoreAttributes: false, attributeNamePrefix: '@_', cdataPropName: '__cdata',
  textNodeName: '__text', isArray: (name) => ['item','wp:postmeta','category'].includes(name),
  parseTagValue: false, trimValues: true,
})
const result = parser.parse(xml)
const items = result.rss.channel.item || []

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

// Find nav menu items
const navItems = items.filter(i => cdata(i['wp:post_type']) === 'nav_menu_item')
navItems.forEach(i => {
  const title = cdata(i.title)
  const meta = i['wp:postmeta'] || []
  const url = getMeta(meta, '_menu_item_url')
  const type = getMeta(meta, '_menu_item_type')
  const cats = i.category || []
  const menuName = cats.map(c => {
    if (typeof c === 'object') return cdata(c.__cdata || c.__text || '')
    return String(c)
  }).join(', ')
  const parentId = getMeta(meta, '_menu_item_menu_item_parent')
  const postId = cdata(i['wp:post_id'])
  console.log(`[${postId}] parent=${parentId} | ${title} | ${type} | ${url} | menu: ${menuName.substring(0,40)}`)
})
