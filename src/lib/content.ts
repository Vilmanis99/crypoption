import postsData from '@/data/posts.json'
import pagesData from '@/data/pages.json'
import categoriesData from '@/data/categories.json'
import authorsData from '@/data/authors.json'
import type { Post, Category, Author } from './types'

const posts = postsData as Post[]
const pages = pagesData as Post[]
const categories = categoriesData as Category[]
const authors = authorsData as Author[]

// Slugify text for heading IDs
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // strip inner tags
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Strip WordPress Gutenberg block comments, inject heading IDs, lazy-load images, wrap bare tables
export function cleanContent(html: string): string {
  // Track used IDs to avoid duplicates
  const usedIds: Record<string, number> = {}

  return html
    .replace(/<!-- wp:[^>]*?-->/g, '')
    .replace(/<!-- \/wp:[^>]*?-->/g, '')
    // Inject id on h2/h3 that lack one (needed for Table of Contents)
    .replace(/<(h[23])(?![^>]*\bid=)([^>]*)>([\s\S]*?)<\/h[23]>/g, (match, tag, attrs, inner) => {
      const base = slugifyHeading(inner)
      if (!base) return match
      usedIds[base] = (usedIds[base] || 0) + 1
      const id = usedIds[base] === 1 ? base : `${base}-${usedIds[base]}`
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    })
    // Lazy-load images that don't already have loading attribute
    .replace(/<img(?![^>]*\bloading=)([^>]*>)/g, '<img loading="lazy"$1')
    // Wrap standalone <table> (not already in a wrapper) for horizontal scroll on mobile
    .replace(/(<table(?![^>]*class="tablepress")[^>]*>)/g, '<div class="table-scroll-wrap">$1')
    .replace(/<\/table>/g, '</table></div>')
    .trim()
}

// Extract headings from cleaned HTML for Table of Contents
export interface Heading {
  level: number
  id: string
  text: string
}

export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = []
  const re = /<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/g
  let m
  while ((m = re.exec(html)) !== null) {
    headings.push({
      level: parseInt(m[1]),
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, '').trim(),
    })
  }
  return headings
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export function getAllPosts(lang?: string): Post[] {
  const all = posts
  if (!lang) return all
  return all.filter((p) => p.language === lang)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(categoryName: string): Post[] {
  return posts.filter((p) =>
    p.categories.some((c) => c.toLowerCase() === categoryName.toLowerCase())
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export function getAllPages(): Post[] {
  return pages
}

export function getPageBySlug(slug: string): Post | undefined {
  return pages.find((p) => p.slug === slug)
}

// ─── Combined lookup (post or page) ──────────────────────────────────────────

export function getContentBySlug(slug: string): Post | undefined {
  return getPostBySlug(slug) ?? getPageBySlug(slug)
}

// Slugs that have dedicated Next.js routes and must not be handled by [slug]/page.tsx
const RESERVED_SLUGS = new Set(['blog', 'blog-ru', 'home', 'home-ru', 'brokers'])

// Returns all EN slugs (posts + pages) for static generation
export function getAllEnSlugs(): string[] {
  const postSlugs = posts.filter((p) => p.language === 'en').map((p) => p.slug)
  const pageSlugs = pages.map((p) => p.slug).filter((s) => !RESERVED_SLUGS.has(s))
  return [...postSlugs, ...pageSlugs]
}

// Returns all RU post slugs for static generation
export function getAllRuSlugs(): string[] {
  return posts.filter((p) => p.language === 'ru').map((p) => p.slug)
}

// ─── Categories ───────────────────────────────────────────────────────────────

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

// ─── Authors ──────────────────────────────────────────────────────────────────

export function getAuthorByLogin(login: string): Author | undefined {
  return authors.find((a) => a.login === login)
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
