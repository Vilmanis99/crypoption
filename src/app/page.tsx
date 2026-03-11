import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/content'
import PostCard from '@/components/PostCard'
import InlineEmailCapture from '@/components/InlineEmailCapture'

const BROKERS = [
  { name: 'Pocket Option', logo: '/images/2024/10/Pocket-Option-Logo-No-BG.png', rating: '4.8', payout: '92%', minDep: '$5', href: '/pocket/go-en', review: '/pocket-option-review/' },
  { name: 'Quotex',        logo: '/images/2024/10/Quotex-Logo-No-BG.png.png',    rating: '4.7', payout: '95%', minDep: '$10', href: '/quotex/go-en',  review: '/quotex-review/' },
  { name: 'IQ Option',     logo: '/images/2024/10/IQ-Option-Logo-Square.png',    rating: '4.5', payout: '90%', minDep: '$10', href: '/iq-option/go-en', review: '/iq-option-review/' },
  { name: 'Binomo',        logo: '/images/2024/10/Binomo-Logo-Square.png',       rating: '4.3', payout: '87%', minDep: '$10', href: '/binomo/go-en',  review: '/binomo-review/' },
]

const STATS = [
  { value: '76+', label: 'Expert Articles' },
  { value: '37',  label: 'Tested Strategies' },
  { value: '5',   label: 'Brokers Reviewed' },
  { value: '2+',  label: 'Years of Research' },
]

const FEATURES = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Tested Strategies',
    desc: 'Every strategy is backtested and forward-tested by our traders before being shared.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Unbiased Reviews',
    desc: 'We open real accounts and deposit real money to give you honest reviews.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: 'Signal Analysis',
    desc: 'We evaluate signal providers so you know which ones actually deliver.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: 'Learning Hub',
    desc: 'From basics to advanced — our library helps traders at every level improve.',
  },
]

function StarRating({ rating }: { rating: string }) {
  const num = parseFloat(rating)
  const full = Math.floor(num)
  const half = num - full >= 0.3
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <defs><linearGradient id="hf"><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient></defs>
          <path fill="url(#hf)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      <span className="ml-1 text-xs font-bold" style={{ color: '#94a3b8' }}>{rating}</span>
    </span>
  )
}

export default function HomePage() {
  const posts = getAllPosts('en').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const recent = posts.slice(0, 6)
  const strategies = posts
    .filter(p => p.categories.includes('Strategies'))
    .slice(0, 4)

  return (
    <main>
      {/* ════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════ */}
      <section className="hero-section relative overflow-hidden text-white">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)' }} />
        {/* Grid pattern overlay */}
        <div className="hero-grid absolute inset-0 opacity-[0.04]" />
        {/* Glow orbs */}
        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: '#1b59ff' }} />
        <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]" style={{ background: '#7adeff' }} />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold" style={{ borderColor: '#1e3a5f', background: 'rgba(27,89,255,0.08)', color: '#7adeff' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Trusted by traders worldwide
            </div>

            <h1 className="mb-6 font-black leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(32px, 5.5vw, 56px)' }}>
              Trade Smarter with{' '}
              <span style={{ color: '#7adeff' }}>Expert-Tested</span>{' '}
              Reviews & Strategies
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed" style={{ color: '#b0bec5' }}>
              We open real accounts, deposit real money, and test every broker and strategy firsthand — so you never have to guess.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/brokers/"
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all"
                style={{ background: '#1b59ff', boxShadow: '0 0 30px rgba(27,89,255,0.35), 0 8px 24px rgba(27,89,255,0.25)' }}
              >
                Compare Brokers
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/category/strategies/"
                className="inline-flex items-center gap-2 rounded-xl border px-8 py-3.5 font-bold transition-all hover:bg-white/5"
                style={{ borderColor: '#2a3f55', color: '#7adeff' }}
              >
                Browse Proven Strategies
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden sm:grid-cols-4"
            style={{ borderRadius: 16, background: '#1e2e40' }}
          >
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center px-6 py-5" style={{ background: 'rgba(16,25,35,0.8)' }}>
                <span className="text-2xl font-black" style={{ color: '#7adeff' }}>{stat.value}</span>
                <span className="mt-1 text-xs font-semibold" style={{ color: '#64748b' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          START HERE BANNER
         ════════════════════════════════════════════════════════ */}
      <div className="px-4 py-8" style={{ background: 'linear-gradient(135deg, #f0f7ff, #e8f4fe)' }}>
        <Link
          href="/binary-options-trading-guide/"
          className="mx-auto flex max-w-3xl items-center gap-5 rounded-2xl p-5 transition-all hover:shadow-lg"
          style={{ background: '#fff', border: '1px solid #d0e3f7', boxShadow: '0 4px 16px rgba(27,89,255,0.08)' }}
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{ background: 'linear-gradient(135deg, #1b59ff, #4f8aff)' }}
          >
            <span className="text-white">📘</span>
          </div>
          <div className="flex-1">
            <p className="font-black" style={{ fontSize: 16, color: '#0f172a' }}>
              New to Binary Options?
            </p>
            <p className="mt-0.5 text-sm" style={{ color: '#64748b' }}>
              Start with our complete beginner&apos;s guide — learn the basics, understand risk, and choose the right broker.
            </p>
          </div>
          <span
            className="hidden shrink-0 rounded-full px-5 py-2 text-sm font-bold text-white sm:inline-block"
            style={{ background: '#1b59ff' }}
          >
            Read Guide →
          </span>
        </Link>
      </div>

      {/* ════════════════════════════════════════════════════════
          BROKER TRUST STRIP
         ════════════════════════════════════════════════════════ */}
      <section className="border-b py-10" style={{ background: '#fff' }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-10 px-4 sm:gap-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>We Review</span>
          {BROKERS.map(b => (
            <Link key={b.name} href={b.review} className="flex flex-col items-center gap-2 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <img src={b.logo} alt={b.name} loading="lazy" className="h-14 w-auto object-contain sm:h-16" />
              <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>{b.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TOP BROKERS — the money section
         ════════════════════════════════════════════════════════ */}
      <section className="relative -mt-1 py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
              Recommended
            </span>
          </div>
          <h2 className="mb-3 text-center font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}>
            Top Rated Brokers for 2026
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm" style={{ color: '#64748b' }}>
            Real-money tested. Every broker reviewed with our own deposited funds.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BROKERS.map((b, i) => (
              <div
                key={b.name}
                className="group relative flex flex-col items-center overflow-hidden p-7 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderRadius: 20,
                  border: i === 0 ? '2px solid #1b59ff' : '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                {i === 0 && (
                  <span
                    className="absolute -right-8 top-4 rotate-45 px-10 py-0.5 text-[10px] font-black uppercase text-white"
                    style={{ background: '#1b59ff' }}
                  >
                    #1 Pick
                  </span>
                )}
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="mb-4 h-20 w-28 object-contain"
                />
                <h3 className="mb-2 font-black" style={{ fontSize: 18, color: '#101923' }}>{b.name}</h3>
                <StarRating rating={b.rating} />

                <div className="mt-4 w-full space-y-2.5 text-left text-sm">
                  <div className="flex items-center justify-between" style={{ color: '#374a5d' }}>
                    <span style={{ color: '#64748b' }}>Payout</span>
                    <span className="font-bold">{b.payout}</span>
                  </div>
                  <div className="flex items-center justify-between" style={{ color: '#374a5d' }}>
                    <span style={{ color: '#64748b' }}>Min. Deposit</span>
                    <span className="font-bold">{b.minDep}</span>
                  </div>
                </div>

                <div className="mt-6 flex w-full flex-col gap-2.5">
                  <a
                    href={b.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: '#1b59ff', boxShadow: '0 4px 12px rgba(27,89,255,0.25)' }}
                  >
                    Start Trading
                  </a>
                  <Link
                    href={b.review}
                    className="block w-full rounded-xl py-2.5 text-center text-sm font-bold transition-colors hover:bg-slate-50"
                    style={{ color: '#374a5d', border: '1px solid #e2e8f0' }}
                  >
                    Read Review
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: '#94a3b8' }}>
            Your capital is at risk. Trading involves significant risk of loss.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT WE OFFER
         ════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              Why traders choose us
            </span>
          </div>
          <h2 className="mb-4 text-center font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}>
            Built on Real Testing, Not Guesswork
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-sm" style={{ color: '#64748b' }}>
            Every piece of content on CrypOptionHub comes from hands-on experience in the markets.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group flex gap-5 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center transition-colors"
                  style={{ borderRadius: 14, background: '#eef4fe', color: '#1d4ed8' }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 font-black" style={{ fontSize: 17, color: '#101923' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EMAIL CAPTURE
         ════════════════════════════════════════════════════════ */}
      <InlineEmailCapture variant="wide" />

      {/* ════════════════════════════════════════════════════════
          POPULAR STRATEGIES
         ════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#fef3c7', color: '#b45309' }}>
                Most Popular
              </span>
              <h2 className="mt-3 font-black" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}>
                Trending Strategies
              </h2>
            </div>
            <Link
              href="/category/strategies/"
              className="hidden items-center gap-1 text-sm font-bold transition-colors hover:underline sm:flex"
              style={{ color: '#1b59ff' }}
            >
              All Strategies
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {strategies.map((s, i) => (
              <Link
                key={s.id}
                href={`/${s.slug}/`}
                className="group flex items-center gap-5 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  padding: 6,
                }}
              >
                {s.featuredImage && (
                  <div className="flex h-28 w-36 shrink-0 items-center justify-center overflow-hidden sm:h-32 sm:w-44" style={{ borderRadius: 12, background: '#0f172a' }}>
                    <img
                      src={s.featuredImage}
                      alt={s.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 pr-5">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
                    #{i + 1} Trending
                  </span>
                  <h3
                    className="mt-2.5 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600"
                    style={{ fontSize: 17, color: '#0f172a' }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>{formatDate(s.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          POCKET OPTION SPOTLIGHT
         ════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#101923' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="items-center gap-12 lg:flex">
            <div className="flex-1">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(122,222,255,0.1)', color: '#7adeff' }}>
                Featured Broker
              </span>
              <h2 className="mb-4 mt-4 font-black text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)' }}>
                Pocket Option — Our #1 Pick for 2026
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: '#8899aa', fontSize: 15 }}>
                With a $5 minimum deposit, 92% payouts, and a demo account with $50,000 virtual funds,
                Pocket Option is ideal for both beginners and experienced traders.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  '$5 minimum deposit — lowest in the industry',
                  'Up to 92% payout on successful trades',
                  'Free demo account with $50,000 virtual funds',
                  '100+ trading assets including crypto',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#94a3b8' }}>
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/pocket/go-en"
                  target="_blank"
                  rel="nofollow noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 font-bold text-white transition-all hover:opacity-90"
                  style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.3)' }}
                >
                  Try Pocket Option Free
                </a>
                <Link
                  href="/pocket-option-review/"
                  className="inline-flex items-center gap-2 rounded-xl border px-7 py-3 font-bold transition-all hover:bg-white/5"
                  style={{ borderColor: '#2a3f55', color: '#7adeff' }}
                >
                  Full Review
                </Link>
              </div>
            </div>
            <div className="mt-10 flex-1 lg:mt-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Best Strategies', href: '/pocket-option-strategy/', icon: '📈' },
                  { label: 'Demo Account',    href: '/pocket-option-demo/',     icon: '🧪' },
                  { label: 'Promo Codes',     href: '/pocket-option-promo-codes/', icon: '🎁' },
                  { label: 'Copy Trading',    href: '/pocket-option-copy-trading/', icon: '👥' },
                  { label: 'Withdrawal',      href: '/pocket-option-withdrawal/',  icon: '💰' },
                  { label: 'Registration',    href: '/pocket-option-registration/', icon: '📝' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all hover:bg-white/5"
                    style={{ borderColor: '#1e2e40', color: '#94a3b8' }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          YOUTUBE / SOCIAL PROOF
         ════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#fee2e2', color: '#dc2626' }}>
              Watch & Learn
            </span>
          </div>
          <h2 className="mb-3 text-center font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}>
            Learn Trading on YouTube
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm" style={{ color: '#64748b' }}>
            Watch our strategy breakdowns, broker walkthroughs, and live trading analysis on our YouTube channel.
          </p>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Featured video embed */}
            <div className="overflow-hidden" style={{ borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/-jX8z5LpmHI"
                  title="CrypOptionHub YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ borderRadius: '20px 20px 0 0' }}
                />
              </div>
            </div>

            {/* Channel card + social links */}
            <div className="flex flex-col gap-5">
              <div
                className="flex-1 p-6"
                style={{ borderRadius: 20, background: 'linear-gradient(135deg, #101923, #374a5d)' }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-black text-white" style={{ fontSize: 16 }}>CrypOptionHub</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>YouTube Channel</p>
                  </div>
                </div>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                  Strategy tutorials, broker platform walkthroughs, indicator setups, and live trade examples.
                </p>
                <a
                  href="https://www.youtube.com/@CrypOptionHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: '#dc2626' }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Subscribe
                </a>
              </div>

              {/* Other socials */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.instagram.com/crypoptionhub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#374a5d' }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E4405F' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@crypoptionhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#374a5d' }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.15v-3.44a4.85 4.85 0 01-3.77-1.68V6.69h3.77z"/>
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          RECENT ARTICLES
         ════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
                Latest
              </span>
              <h2 className="mt-3 font-black" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}>
                Recent Articles
              </h2>
            </div>
            <Link
              href="/blog/"
              className="hidden items-center gap-1 text-sm font-bold transition-colors hover:underline sm:flex"
              style={{ color: '#1b59ff' }}
            >
              View All Articles
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white"
              style={{ background: '#1b59ff' }}
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BOTTOM CTA
         ════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-black" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}>
            Ready to Start Trading?
          </h2>
          <p className="mx-auto mb-8 max-w-lg" style={{ color: '#64748b', fontSize: 16 }}>
            Compare the best brokers, learn proven strategies, and start your trading journey
            with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/brokers/"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.25)' }}
            >
              Compare Brokers
            </Link>
            <Link
              href="/pocket-option-demo/"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold transition-all hover:bg-slate-100"
              style={{ border: '2px solid #e2e8f0', color: '#101923', background: '#f8fafc' }}
            >
              Try Free Demo
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: '#94a3b8' }}>
            Your capital is at risk. Trade responsibly.
          </p>
        </div>
      </section>
    </main>
  )
}
