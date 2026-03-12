import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Broker Comparisons — Which Binary Options Broker Is Best?',
  description: 'Side-by-side comparisons of the top binary options brokers. Compare Pocket Option vs Quotex, IQ Option, and more — payouts, features, and platforms.',
  alternates: {
    canonical: 'https://crypoptionhub.com/compare/',
  },
}

export default function ComparePage() {
  const posts = getAllPosts('en')
  const comparisons = posts.filter(
    p => p.slug.includes('-vs-') || p.title.toLowerCase().includes(' vs ')
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crypoptionhub.com/' },
      { '@type': 'ListItem', position: 2, name: 'Broker Comparisons', item: 'https://crypoptionhub.com/compare/' },
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
            Head to Head
          </span>
          <h1 className="mb-4 font-black" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
            Broker Comparisons
          </h1>
          <p className="mx-auto max-w-xl text-lg" style={{ color: '#94a3b8' }}>
            Can&apos;t decide between brokers? Our side-by-side comparisons break down payouts, platforms, features, and more.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span style={{ color: '#64748b' }}>Broker Comparisons</span>
        </nav>
      </div>

      {/* Articles grid */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        {comparisons.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map(post => (
              <Link
                key={post.id}
                href={`/${post.slug}/`}
                className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff' }}
              >
                {post.featuredImage && (
                  <div className="h-44 overflow-hidden" style={{ background: '#0f172a' }}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="mb-2 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" style={{ fontSize: 17, color: '#0f172a' }}>
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3" style={{ color: '#64748b' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
                    <span className="text-xs font-bold" style={{ color: '#1b59ff' }}>Read Comparison →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center" style={{ color: '#64748b' }}>Comparisons coming soon!</p>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-black" style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', color: '#101923' }}>
            Want the Full Picture?
          </h2>
          <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
            See all brokers ranked with ratings, payouts, and features in one place.
          </p>
          <Link
            href="/brokers/"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white"
            style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.25)' }}
          >
            View All Brokers →
          </Link>
        </div>
      </section>
    </main>
  )
}
