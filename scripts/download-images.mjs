/**
 * Image Downloader
 * Downloads all media from crypoptionhub.com/wp-content/uploads/
 * and saves to public/images/ preserving the folder structure.
 *
 * Run with: node scripts/download-images.mjs
 *
 * After running, update next.config.ts to remove the remotePatterns
 * and update content.ts to rewrite image URLs to /images/...
 */

import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public/images')

// Collect all image URLs from posts, pages, and attachments
const posts = JSON.parse(readFileSync(resolve(ROOT, 'src/data/posts.json'), 'utf-8'))
const pages = JSON.parse(readFileSync(resolve(ROOT, 'src/data/pages.json'), 'utf-8'))
const attachments = JSON.parse(readFileSync(resolve(ROOT, 'src/data/attachments.json'), 'utf-8'))

const urlSet = new Set()

// Featured images
for (const post of [...posts, ...pages]) {
  if (post.featuredImage) urlSet.add(post.featuredImage)
}

// All attachment URLs
for (const att of attachments) {
  if (att.url) urlSet.add(att.url)
}

// Images referenced in content
const imgRegex = /https:\/\/crypoptionhub\.com\/wp-content\/uploads\/[^\s"')>]+/g
for (const post of [...posts, ...pages]) {
  const matches = post.content.match(imgRegex) || []
  matches.forEach((url) => urlSet.add(url))
}

const urls = [...urlSet].filter((u) => /\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i.test(u))

console.log(`Found ${urls.length} unique images to download.\n`)

mkdirSync(OUT_DIR, { recursive: true })

let success = 0
let skipped = 0
let failed = 0

for (const url of urls) {
  // Convert URL to local path: strip domain + /wp-content/uploads/
  const relative = url.replace('https://crypoptionhub.com/wp-content/uploads/', '')
  const localPath = resolve(OUT_DIR, relative)
  const localDir = dirname(localPath)

  if (existsSync(localPath)) {
    skipped++
    continue
  }

  mkdirSync(localDir, { recursive: true })

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) {
      console.warn(`  FAIL ${res.status}: ${url}`)
      failed++
      continue
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    writeFileSync(localPath, buffer)
    console.log(`  ✓ ${relative}`)
    success++
  } catch (err) {
    console.warn(`  ERROR: ${url} — ${err.message}`)
    failed++
  }
}

console.log(`\nDone: ${success} downloaded, ${skipped} skipped (exist), ${failed} failed`)
console.log(`Images saved to: public/images/`)
console.log('\nNext step: replace image URLs in content from')
console.log('  https://crypoptionhub.com/wp-content/uploads/*')
console.log('  → /images/*')
