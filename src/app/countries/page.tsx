import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Binary Options Brokers by Country — Find the Best Broker Near You',
  description: 'Country-specific guides to binary options brokers. Find regulated brokers with local deposit methods for India, Brazil, South Africa, and more.',
  alternates: {
    canonical: 'https://crypoptionhub.com/countries/',
  },
}

const COUNTRY_SLUGS = [
  'best-binary-options-brokers-india',
  'best-binary-options-brokers-brazil',
  'best-binary-options-brokers-south-africa',
]

const COUNTRY_FLAGS: Record<string, string> = {
  india: '🇮🇳',
  brazil: '🇧🇷',
  'south-africa': '🇿🇦',
}

function getCountryFlag(slug: string): string {
  for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
    if (slug.includes(key)) return flag
  }
  return '🌍'
}

export default function CountriesPage() {
  const posts = getAllPosts('en')
  const countryArticles = posts
    .filter(p => COUNTRY_SLUGS.includes(p.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crypoptionhub.com/' },
      { '@type': 'ListItem', position: 2, name: 'Brokers by Country', item: 'https://crypoptionhub.com/countries/' },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 text-white lg:py-24" style={{ background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)' }}>
        <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]" style={{ background: '#7adeff' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(27,89,255,0.1)', color: '#7adeff', border: '1px solid #1e3a5f' }}>
            Regional Guides
          </span>
          <h1 className="mb-4 font-black" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
            Brokers by Country
          </h1>
          <p className="mx-auto max-w-xl text-lg" style={{ color: '#94a3b8' }}>
            Find the best binary options brokers available in your country — with local deposit methods, regulations, and platform access.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span style={{ color: '#64748b' }}>Brokers by Country</span>
        </nav>
      </div>

      {/* Country cards */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countryArticles.map(post => (
            <Link
              key={post.id}
              href={`/${post.slug}/`}
              className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff' }}
            >
              <div className="relative h-44 overflow-hidden" style={{ background: '#0f172a' }}>
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-4 top-4 text-4xl">{getCountryFlag(post.slug)}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="mb-2 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600" style={{ fontSize: 17, color: '#0f172a' }}>
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3" style={{ color: '#64748b' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
                  <span className="text-xs font-bold" style={{ color: '#1b59ff' }}>Read Guide →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More coming soon */}
        <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
          <p className="text-lg font-bold" style={{ color: '#374a5d' }}>More Countries Coming Soon</p>
          <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
            We&apos;re working on guides for Nigeria, Indonesia, Philippines, Pakistan, and more. Subscribe to get notified!
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-black" style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', color: '#101923' }}>
            Not Sure Which Broker to Pick?
          </h2>
          <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
            See all brokers ranked by payout, deposit, and features — regardless of country.
          </p>
          <Link
            href="/brokers/"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white"
            style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.25)' }}
          >
            Compare All Brokers →
          </Link>
        </div>
      </section>
    </main>
  )
}
