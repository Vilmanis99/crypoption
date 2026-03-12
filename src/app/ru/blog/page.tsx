import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Блог | CrypOptionHub',
  description: 'Последние статьи о бинарных опционах, обзоры брокеров, стратегии и советы по торговле.',
  alternates: { canonical: 'https://crypoptionhub.com/ru/blog/' },
}

const POSTS_PER_PAGE = 12

export default async function RuBlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const allPosts = getAllPosts('ru').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const page = Math.min(currentPage, totalPages || 1)
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
        <Link href="/ru/" className="hover:underline">Главная</Link>
        <span>/</span>
        <span style={{ color: '#64748b' }}>Блог</span>
      </nav>

      {/* Header */}
      <div
        className="mb-10 overflow-hidden px-8 py-10 text-center"
        style={{ borderRadius: 24, background: 'linear-gradient(135deg, #101923, #1e3a5f, #101923)' }}
      >
        <h1 className="mb-2 font-black text-white" style={{ fontSize: 'clamp(28px, 5vw, 40px)' }}>
          Блог
        </h1>
        <p className="mx-auto max-w-lg text-sm" style={{ color: '#94a3b8' }}>
          Последние статьи о бинарных опционах, обзоры брокеров и торговые стратегии.
        </p>
        <p className="mt-3 text-xs font-bold" style={{ color: '#7adeff' }}>
          {allPosts.length} статей опубликовано
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
            style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff' }}
          >
            {post.featuredImage && (
              <Link href={`/ru/${post.slug}/`} className="block overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.featuredImage} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              </Link>
            )}
            <div className="flex flex-1 flex-col p-5">
              {post.categories[0] && (
                <span className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: '#0284c7' }}>{post.categories[0]}</span>
              )}
              <Link href={`/ru/${post.slug}/`}>
                <h3 className="mb-2 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" style={{ fontSize: 17, color: '#0f172a' }}>{post.title}</h3>
              </Link>
              {post.excerpt && (
                <p className="mb-4 text-sm leading-relaxed line-clamp-2" style={{ color: '#64748b' }}>{post.excerpt}</p>
              )}
              <div className="mt-auto flex items-center justify-between">
                <time className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
                <Link href={`/ru/${post.slug}/`} className="rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: '#1b59ff' }}>
                  Читать
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={page === 2 ? '/ru/blog/' : `/ru/blog/?page=${page - 1}`}
              className="rounded-xl px-5 py-2.5 text-sm font-bold transition-colors hover:bg-slate-100"
              style={{ border: '1px solid #e2e8f0', color: '#374a5d' }}
            >
              Назад
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={p === 1 ? '/ru/blog/' : `/ru/blog/?page=${p}`}
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
              href={`/ru/blog/?page=${page + 1}`}
              className="rounded-xl px-5 py-2.5 text-sm font-bold transition-colors hover:bg-slate-100"
              style={{ border: '1px solid #e2e8f0', color: '#374a5d' }}
            >
              Далее
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
