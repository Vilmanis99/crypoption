import type { MetadataRoute } from 'next'
import { getAllPosts, getAllPages, getAllCategories } from '@/lib/content'
import authorsData from '@/data/authors.json'

const BASE = 'https://crypoptionhub.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const enPosts = getAllPosts('en').map((post) => ({
    url: `${BASE}/${post.slug}/`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const ruPosts = getAllPosts('ru').map((post) => ({
    url: `${BASE}/ru/${post.slug}/`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const pages = getAllPages().map((page) => ({
    url: `${BASE}/${page.slug}/`,
    lastModified: new Date(page.modified || page.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const cats = getAllCategories()
    .filter((c) => !['uncategorized', 'uncategorized-ru'].includes(c.slug))
    .map((cat) => ({
      url: `${BASE}/category/${cat.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  const authorPages = authorsData.map((a: { login: string }) => ({
    url: `${BASE}/author/${a.login.toLowerCase().replace(/[@.]/g, '')}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    { url: BASE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/blog/`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE}/brokers/`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/compare/`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/countries/`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/ru/`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE}/ru/blog/`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/ru/brokers/`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/ru/compare/`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/ru/countries/`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/about/`, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE}/contact/`, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE}/privacy-policy/`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/disclaimers/`, changeFrequency: 'yearly' as const, priority: 0.3 },
    ...enPosts,
    ...ruPosts,
    ...pages,
    ...cats,
    ...authorPages,
  ]
}
