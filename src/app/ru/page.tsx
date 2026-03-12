import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, formatDate } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'CrypOptionHub — Обзоры брокеров бинарных опционов и стратегии',
  description: 'Экспертные обзоры брокеров бинарных опционов, торговые стратегии, сигналы и обучение для трейдеров.',
  alternates: { canonical: 'https://crypoptionhub.com/ru/' },
}

const BROKERS = [
  { name: 'Pocket Option', logo: '/images/2024/10/Pocket-Option-Logo-No-BG.png', rating: '4.8', payout: '92%', minDep: '$5', href: '/pocket/go-rus', review: '/ru/pocket-option-ru/' },
  { name: 'Quotex',        logo: '/images/2024/10/Quotex-Logo-No-BG.png.png',    rating: '4.7', payout: '95%', minDep: '$10', href: '/quotex/go-en',  review: '/ru/quotex-ru/' },
  { name: 'IQ Option',     logo: '/images/2024/10/IQ-Option-Logo-Square.png',    rating: '4.5', payout: '90%', minDep: '$10', href: '/iq-option/go-en', review: '/ru/iq-option-ru/' },
  { name: 'Binomo',        logo: '/images/2024/10/Binomo-Logo-Square.png',       rating: '4.3', payout: '87%', minDep: '$10', href: '/binomo/go-en',  review: '/ru/binomo-ru/' },
]

const STATS = [
  { value: '150+', label: 'Экспертных статей' },
  { value: '40+',  label: 'Стратегий' },
  { value: '5',    label: 'Брокеров' },
  { value: '2+',   label: 'Лет исследований' },
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
          <defs><linearGradient id="hfru"><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient></defs>
          <path fill="url(#hfru)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      <span className="ml-1 text-xs font-bold" style={{ color: '#94a3b8' }}>{rating}</span>
    </span>
  )
}

function RuPostCard({ post }: { post: { id: string; slug: string; title: string; excerpt: string; featuredImage: string; date: string; categories: string[] } }) {
  return (
    <article
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
  )
}

export default function RuHomePage() {
  const posts = getAllPosts('ru').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const recent = posts.slice(0, 6)
  const strategies = posts.filter(p => p.categories.some(c => c.toLowerCase().includes('strateg') || c.toLowerCase().includes('стратег'))).slice(0, 4)

  return (
    <main>
      {/* HERO */}
      <section className="hero-section relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0a1018 0%, #101923 30%, #1a2b3d 60%, #0f2032 100%)' }} />
        <div className="hero-grid absolute inset-0 opacity-[0.04]" />
        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: '#1b59ff' }} />
        <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full opacity-15 blur-[80px]" style={{ background: '#7adeff' }} />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold" style={{ borderColor: '#1e3a5f', background: 'rgba(27,89,255,0.08)', color: '#7adeff' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Доверяют трейдеры по всему миру
            </div>

            <h1 className="mb-6 font-black leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(32px, 5.5vw, 56px)' }}>
              Торгуйте умнее с{' '}
              <span style={{ color: '#7adeff' }}>проверенными</span>{' '}
              обзорами и стратегиями
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed" style={{ color: '#8899aa' }}>
              Мы открываем реальные счета, вносим реальные деньги и тестируем каждого брокера и стратегию — чтобы вам не приходилось гадать.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ru/brokery/"
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all"
                style={{ background: '#1b59ff', boxShadow: '0 0 30px rgba(27,89,255,0.35), 0 8px 24px rgba(27,89,255,0.25)' }}
              >
                Сравнить брокеров
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/category/strategies/"
                className="inline-flex items-center gap-2 rounded-xl border px-8 py-3.5 font-bold transition-all hover:bg-white/5"
                style={{ borderColor: '#2a3f55', color: '#7adeff' }}
              >
                Стратегии
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden sm:grid-cols-4" style={{ borderRadius: 16, background: '#1e2e40' }}>
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center px-6 py-5" style={{ background: 'rgba(16,25,35,0.8)' }}>
                <span className="text-2xl font-black" style={{ color: '#7adeff' }}>{stat.value}</span>
                <span className="mt-1 text-xs font-semibold" style={{ color: '#64748b' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROKER TRUST STRIP */}
      <section className="border-b py-10" style={{ background: '#fff' }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-10 px-4 sm:gap-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Мы проверяем</span>
          {BROKERS.map(b => (
            <Link key={b.name} href={b.review} className="flex flex-col items-center gap-2 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <img src={b.logo} alt={b.name} loading="lazy" className="h-14 w-auto object-contain sm:h-16" />
              <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>{b.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP BROKERS */}
      <section className="relative -mt-1 py-16" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
              Рекомендуем
            </span>
          </div>
          <h2 className="mb-3 text-center font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}>
            Лучшие брокеры 2026
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm" style={{ color: '#64748b' }}>
            Проверено на реальных деньгах. Каждый брокер протестирован с нашим депозитом.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BROKERS.map((b, i) => (
              <div
                key={b.name}
                className="group relative flex flex-col items-center overflow-hidden p-7 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderRadius: 20, border: i === 0 ? '2px solid #1b59ff' : '1px solid #e2e8f0', background: '#fff' }}
              >
                {i === 0 && (
                  <span className="absolute -right-8 top-4 rotate-45 px-10 py-0.5 text-[10px] font-black uppercase text-white" style={{ background: '#1b59ff' }}>
                    #1
                  </span>
                )}
                <img src={b.logo} alt={b.name} loading="lazy" className="mb-4 h-20 w-28 object-contain" />
                <h3 className="mb-2 font-black" style={{ fontSize: 18, color: '#101923' }}>{b.name}</h3>
                <StarRating rating={b.rating} />
                <div className="mt-4 w-full space-y-2.5 text-left text-sm">
                  <div className="flex items-center justify-between" style={{ color: '#374a5d' }}>
                    <span style={{ color: '#64748b' }}>Выплата</span>
                    <span className="font-bold">{b.payout}</span>
                  </div>
                  <div className="flex items-center justify-between" style={{ color: '#374a5d' }}>
                    <span style={{ color: '#64748b' }}>Мин. депозит</span>
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
                    Открыть счёт
                  </a>
                  <Link
                    href={b.review}
                    className="block w-full rounded-xl py-2.5 text-center text-sm font-bold transition-colors hover:bg-slate-50"
                    style={{ color: '#374a5d', border: '1px solid #e2e8f0' }}
                  >
                    Читать обзор
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: '#94a3b8' }}>
            Ваш капитал под риском. Торговля связана со значительным риском убытков.
          </p>
        </div>
      </section>

      {/* POCKET OPTION SPOTLIGHT */}
      <section className="py-16" style={{ background: '#101923' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="items-center gap-12 lg:flex">
            <div className="flex-1">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(122,222,255,0.1)', color: '#7adeff' }}>
                Рекомендуемый брокер
              </span>
              <h2 className="mb-4 mt-4 font-black text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)' }}>
                Pocket Option — Наш выбор #1 на 2026
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: '#8899aa', fontSize: 15 }}>
                С минимальным депозитом $5, выплатами до 92% и демо-счётом с $50,000 виртуальных средств,
                Pocket Option идеален как для начинающих, так и для опытных трейдеров.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  'Минимальный депозит $5 — самый низкий в индустрии',
                  'Выплаты до 92% на успешных сделках',
                  'Бесплатный демо-счёт с $50,000 виртуальных средств',
                  '100+ торговых активов, включая криптовалюты',
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
                  href="/pocket/go-rus"
                  target="_blank"
                  rel="nofollow noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 font-bold text-white transition-all hover:opacity-90"
                  style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.3)' }}
                >
                  Попробовать бесплатно
                </a>
                <Link
                  href="/ru/pocket-option-ru/"
                  className="inline-flex items-center gap-2 rounded-xl border px-7 py-3 font-bold transition-all hover:bg-white/5"
                  style={{ borderColor: '#2a3f55', color: '#7adeff' }}
                >
                  Полный обзор
                </Link>
              </div>
            </div>
            <div className="mt-10 flex-1 lg:mt-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Лучшие стратегии', href: '/ru/strategija-pocket-option/' },
                  { label: 'Демо-счёт',        href: '/ru/demo-schet-pocket-option/' },
                  { label: 'Промокоды',         href: '/ru/promokody-pocket-option/' },
                  { label: 'Копитрейдинг',      href: '/ru/kopitrejding-pocket-option/' },
                  { label: 'Вывод средств',     href: '/ru/vyvod-sredstv-pocket-option/' },
                  { label: 'Регистрация',       href: '/ru/registracija-pocket-option/' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all hover:bg-white/5"
                    style={{ borderColor: '#1e2e40', color: '#94a3b8' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-3 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#fee2e2', color: '#dc2626' }}>
              Смотрите и учитесь
            </span>
          </div>
          <h2 className="mb-3 text-center font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#101923' }}>
            Обучение трейдингу на YouTube
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm" style={{ color: '#64748b' }}>
            Разборы стратегий, обзоры платформ и анализ торговли на нашем YouTube канале.
          </p>
          <div className="mx-auto max-w-3xl overflow-hidden" style={{ borderRadius: 20, border: '1px solid #e2e8f0' }}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/-jX8z5LpmHI"
                title="CrypOptionHub YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ARTICLES */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
                Новое
              </span>
              <h2 className="mt-3 font-black" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}>
                Последние статьи
              </h2>
            </div>
            <Link
              href="/ru/blog/"
              className="hidden items-center gap-1 text-sm font-bold transition-colors hover:underline sm:flex"
              style={{ color: '#1b59ff' }}
            >
              Все статьи
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map(post => (
              <RuPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-black" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#101923' }}>
            Готовы начать торговлю?
          </h2>
          <p className="mx-auto mb-8 max-w-lg" style={{ color: '#64748b', fontSize: 16 }}>
            Сравните лучших брокеров, изучите проверенные стратегии и начните торговать с уверенностью.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ru/brokery/"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.25)' }}
            >
              Сравнить брокеров
            </Link>
            <Link
              href="/ru/demo-schet-pocket-option/"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold transition-all"
              style={{ border: '2px solid #e2e8f0', color: '#101923' }}
            >
              Попробовать демо
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: '#94a3b8' }}>
            Ваш капитал под риском. Торгуйте ответственно.
          </p>
        </div>
      </section>
    </main>
  )
}
