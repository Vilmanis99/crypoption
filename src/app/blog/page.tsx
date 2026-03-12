import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Blog | CrypOptionHub',
  description: 'Latest binary options articles, broker reviews, strategies, and trading tips from CrypOptionHub.',
  alternates: { canonical: 'https://crypoptionhub.com/blog/' },
}

const POSTS_PER_PAGE = 12

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const allPosts = getAllPosts('en').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const page = Math.min(currentPage, totalPages || 1)
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  const categories = Array.from(new Set(allPosts.flatMap(p => p.categories))).sort()

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
          {allPosts.length} articles published
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={page === 2 ? '/blog/' : `/blog/?page=${page - 1}`}
              className="rounded-xl px-5 py-2.5 text-sm font-bold transition-colors hover:bg-slate-100"
              style={{ border: '1px solid #e2e8f0', color: '#374a5d' }}
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={p === 1 ? '/blog/' : `/blog/?page=${p}`}
              className="rounded-xl px-4 py-2.5 text-sm font-bold transition-colors"
              style={p === page
                ? { background: '#1b59ff', color: '#fff' }
                : { border: '1px solid #e2e8f0', color: '#374a5d' }
              }
            >
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link
              href={`/blog/?page=${page + 1}`}
              className="rounded-xl px-5 py-2.5 text-sm font-bold transition-colors hover:bg-slate-100"
              style={{ border: '1px solid #e2e8f0', color: '#374a5d' }}
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
