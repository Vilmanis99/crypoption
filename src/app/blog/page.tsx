import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Blog | CrypOptionHub',
  description: 'Latest binary options articles, broker reviews, strategies, and trading tips from CrypOptionHub.',
  alternates: { canonical: 'https://crypoptionhub.com/blog/' },
}

export default function BlogPage() {
  const posts = getAllPosts('en').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const categories = Array.from(new Set(posts.flatMap(p => p.categories))).sort()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span style={{ color: '#64748b' }}>Blog</span>
      </nav>

      {/* Header */}
      <div
        className="mb-10 overflow-hidden px-8 py-10 text-center"
        style={{ borderRadius: 24, background: 'linear-gradient(135deg, #101923, #1e3a5f, #101923)' }}
      >
        <h1 className="mb-2 font-black text-white" style={{ fontSize: 'clamp(28px, 5vw, 40px)' }}>
          Blog
        </h1>
        <p className="mx-auto max-w-lg text-sm" style={{ color: '#94a3b8' }}>
          Latest articles on binary options, broker reviews, and trading strategies.
        </p>
        <p className="mt-3 text-xs font-bold" style={{ color: '#7adeff' }}>
          {posts.length} articles published
        </p>
      </div>

      {/* Category filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}/`}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors hover:bg-slate-100"
            style={{ background: '#f1f5f9', color: '#374a5d' }}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
