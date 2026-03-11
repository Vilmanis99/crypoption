import type { Metadata } from 'next'
import Link from 'next/link'
import EconomicCalendar from '@/components/EconomicCalendar'

export const metadata: Metadata = {
  title: 'Economic Calendar | CrypOptionHub',
  description:
    'Track market-moving economic events in real time. Use our free economic calendar to stay ahead of key data releases, central bank decisions, and indicators that impact your trades.',
}

const TIPS = [
  {
    title: 'Filter by Impact',
    desc: 'Focus on high-impact events (marked with red) that are most likely to cause significant price movements in forex, commodities, and indices.',
  },
  {
    title: 'Plan Trades Around Releases',
    desc: 'Major data releases like Non-Farm Payrolls, CPI, and interest rate decisions create volatility spikes — ideal for short-term binary options trades.',
  },
  {
    title: 'Compare Forecast vs. Actual',
    desc: 'Markets react to surprises. When actual data deviates significantly from the forecast, expect sharp moves you can capitalize on.',
  },
  {
    title: 'Avoid Trading During Uncertainty',
    desc: 'If you are unsure how the market will react, stay on the sidelines. Not every event needs to be traded — capital preservation is key.',
  },
]

export default function EconomicCalendarPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://crypoptionhub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://crypoptionhub.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Economic Calendar',
        item: 'https://crypoptionhub.com/tools/economic-calendar',
      },
    ],
  }

  return (
    <main>
      {/* JSON-LD Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)',
        }}
      >
        <div
          className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style={{ background: '#1b59ff' }}
        />
        <div
          className="absolute -right-32 top-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]"
          style={{ background: '#7adeff' }}
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-10 lg:pb-16 lg:pt-14">
          {/* Breadcrumb nav */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm"
            style={{ color: '#64748b' }}
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="transition-colors hover:text-white">
              Tools
            </Link>
            <span>/</span>
            <span style={{ color: '#7adeff' }}>Economic Calendar</span>
          </nav>

          <h1
            className="mb-4 font-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            Economic Calendar
          </h1>
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: '#b0bec5' }}
          >
            Stay ahead of the markets by tracking upcoming economic events, data releases, and central bank decisions.
            Knowing when high-impact events occur helps you time your entries, manage risk, and avoid unnecessary surprises.
          </p>
        </div>
      </section>

      {/* Calendar Widget */}
      <section className="py-10 lg:py-14" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <EconomicCalendar />
          <p className="mt-3 text-center text-xs" style={{ color: '#94a3b8' }}>
            Calendar data provided by TradingView. All times shown in your local timezone.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ background: '#eef4fe', color: '#1d4ed8' }}
            >
              Guide
            </span>
          </div>
          <h2
            className="mb-4 text-center font-black"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}
          >
            How to Use the Economic Calendar
          </h2>
          <p
            className="mx-auto mb-12 max-w-xl text-center text-sm"
            style={{ color: '#64748b' }}
          >
            The economic calendar is one of the most important tools in any trader&apos;s toolkit. Here are some tips to get the most out of it.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {TIPS.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-5 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center font-black text-white"
                  style={{ borderRadius: 12, background: '#1b59ff', fontSize: 15 }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    className="mb-1.5 font-black"
                    style={{ fontSize: 17, color: '#101923' }}
                  >
                    {tip.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#64748b' }}
                  >
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2
            className="mb-4 font-black"
            style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}
          >
            Practice Trading Around Economic Events
          </h2>
          <p
            className="mx-auto mb-8 max-w-lg"
            style={{ color: '#64748b', fontSize: 16 }}
          >
            Practice trading around economic events with Pocket Option&apos;s free demo account.
            Test your strategies risk-free with $50,000 in virtual funds.
          </p>
          <a
            href="/pocket/go-en"
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all hover:opacity-90"
            style={{
              background: '#1b59ff',
              boxShadow: '0 0 24px rgba(27,89,255,0.25)',
            }}
          >
            Try Pocket Option Free Demo
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
          <p className="mt-6 text-xs" style={{ color: '#94a3b8' }}>
            Your capital is at risk. Trade responsibly.
          </p>
        </div>
      </section>
    </main>
  )
}
