import Link from 'next/link'

interface Article {
  slug: string
  title: string
  featuredImage?: string
  excerpt?: string
}

export default function RecommendedReading({ articles, lang }: { articles: Article[]; lang?: string }) {
  if (articles.length === 0) return null
  const isRu = lang === 'ru'

  return (
    <div
      className="my-8 overflow-hidden"
      style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}
    >
      <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
        <p className="text-sm font-bold text-white">{isRu ? 'Рекомендуемое чтение' : 'Recommended Reading'}</p>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {articles.map(a => (
          <Link
            key={a.slug}
            href={isRu ? `/ru/${a.slug}/` : `/${a.slug}/`}
            className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white"
            style={{ border: '1px solid #e2e8f0' }}
          >
            {a.featuredImage && (
              <img
                src={a.featuredImage}
                alt={a.title}
                loading="lazy"
                className="h-14 w-20 shrink-0 object-cover"
                style={{ borderRadius: 8 }}
              />
            )}
            <div>
              <p className="font-bold leading-snug line-clamp-2" style={{ fontSize: 14, color: '#0f172a' }}>
                {a.title}
              </p>
              {a.excerpt && (
                <p className="mt-0.5 text-xs line-clamp-1" style={{ color: '#94a3b8' }}>
                  {a.excerpt}
                </p>
              )}
            </div>
            <svg className="ml-auto h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
