import type { Metadata } from 'next'
import Link from 'next/link'
import { ProfitCalculator, RiskCalculator, MartingaleCalculator } from '@/components/TradingCalculators'

export const metadata: Metadata = {
  title: 'Free Trading Calculators | CrypOptionHub',
  description:
    'Free binary options trading calculators — profit calculator, position size & risk calculator, and martingale simulator. Plan your trades smarter.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Binary Options Trading Calculators',
  url: 'https://crypoptionhub.com/tools/',
  description:
    'Free interactive trading calculators for binary options: profit calculator, risk/position size calculator, and martingale strategy simulator.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'CrypOptionHub',
    url: 'https://crypoptionhub.com',
  },
}

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
      item: 'https://crypoptionhub.com/tools/',
    },
  ],
}

export default function ToolsPage() {
  return (
    <main>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)' }}
        />
        <div
          className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style={{ background: '#1b59ff' }}
        />
        <div
          className="absolute -right-32 top-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]"
          style={{ background: '#7adeff' }}
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-12 lg:pb-20 lg:pt-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
            <Link href="/" className="transition-colors hover:text-white" style={{ color: '#64748b' }}>
              Home
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span style={{ color: '#7adeff' }}>Tools</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
              style={{ borderColor: '#1e3a5f', background: 'rgba(27,89,255,0.08)', color: '#7adeff' }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
              Free Trading Tools
            </div>

            <h1
              className="mb-4 font-black leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
            >
              Trading{' '}
              <span style={{ color: '#7adeff' }}>Calculators</span>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: '#b0bec5' }}>
              Plan your trades with precision. Use our free calculators to estimate profits, manage risk, and understand the true cost of martingale strategies.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CALCULATORS
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl space-y-10 px-4">
          {/* 1. Profit Calculator */}
          <div id="profit-calculator">
            <ProfitCalculator />
          </div>

          {/* 2. Risk Calculator */}
          <div id="risk-calculator">
            <RiskCalculator />
          </div>

          {/* 3. Martingale Calculator */}
          <div id="martingale-calculator">
            <MartingaleCalculator />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA BANNER
         ════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#101923' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(122,222,255,0.1)', color: '#7adeff' }}
          >
            Practice Risk-Free
          </span>
          <h2
            className="mb-4 font-black text-white"
            style={{ fontSize: 'clamp(22px, 3.5vw, 32px)' }}
          >
            Test Your Strategy on a Free Demo Account
          </h2>
          <p className="mx-auto mb-8 max-w-lg" style={{ color: '#8899aa', fontSize: 15 }}>
            Pocket Option offers a free demo account with $50,000 in virtual funds.
            Practice with the calculators above, then try your strategy risk-free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/pocket/go-en"
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', boxShadow: '0 0 30px rgba(27,89,255,0.35), 0 8px 24px rgba(27,89,255,0.25)' }}
            >
              Try Pocket Option Free Demo
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <Link
              href="/pocket-option-review/"
              className="inline-flex items-center gap-2 rounded-xl border px-8 py-3.5 font-bold transition-all hover:bg-white/5"
              style={{ borderColor: '#2a3f55', color: '#7adeff' }}
            >
              Read Full Review
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: '#94a3b8' }}>
            Your capital is at risk. Trading involves significant risk of loss.
          </p>
        </div>
      </section>
    </main>
  )
}
