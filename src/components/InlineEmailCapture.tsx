'use client'

import { useState } from 'react'
import { saveSubscriber } from '@/lib/subscribers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COPY = {
  en: {
    wideTitle: 'Get Weekly Trading Insights',
    wideDesc: 'Join 1,000+ traders receiving proven strategies, broker updates, and market analysis every week.',
    compactTitle: 'Weekly Insights',
    compactDesc: 'Get proven strategies & broker updates delivered weekly.',
    placeholder: 'Your email address',
    placeholderShort: 'Your email',
    btn: 'Subscribe',
    success: "You're subscribed! Check your inbox.",
    error: 'Please enter a valid email.',
  },
  ru: {
    wideTitle: 'Еженедельные торговые инсайты',
    wideDesc: 'Присоединяйтесь к 1,000+ трейдерам, получающим проверенные стратегии и обзоры брокеров.',
    compactTitle: 'Еженедельные инсайты',
    compactDesc: 'Получайте проверенные стратегии и обзоры брокеров еженедельно.',
    placeholder: 'Ваш email адрес',
    placeholderShort: 'Ваш email',
    btn: 'Подписаться',
    success: 'Вы подписаны! Проверьте почту.',
    error: 'Введите корректный email.',
  },
}

export default function InlineEmailCapture({ variant, lang = 'en' }: { variant: 'wide' | 'compact'; lang?: 'en' | 'ru' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const c = COPY[lang]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) { setError(c.error); return }
    saveSubscriber(email, variant === 'wide' ? 'inline' : 'sidebar')
    setSubmitted(true)
  }

  if (variant === 'wide') {
    return (
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)' }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 lg:flex-row lg:justify-between">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="mb-2 font-black text-white" style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>
              {c.wideTitle}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              {c.wideDesc}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={c.placeholder}
                className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none transition-all focus:ring-2"
                style={{ background: '#0d151f', border: '1px solid #1e2e40', borderRadius: 12, color: '#fff' }}
              />
              <button
                type="submit"
                className="shrink-0 px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: '#1b59ff', borderRadius: 12 }}
              >
                {c.btn}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="font-semibold text-emerald-400">{c.success}</span>
            </div>
          )}
          {error && !submitted && <p className="text-xs font-semibold" style={{ color: '#f87171' }}>{error}</p>}
        </div>
      </section>
    )
  }

  // Compact variant — sidebar card
  return (
    <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
      <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
        <h3 className="flex items-center gap-2 font-bold text-white" style={{ fontSize: 15 }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          {c.compactTitle}
        </h3>
      </div>
      <div className="p-5">
        {!submitted ? (
          <>
            <p className="mb-4 text-xs leading-relaxed" style={{ color: '#64748b' }}>
              {c.compactDesc}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={c.placeholderShort}
                className="w-full px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2"
                style={{ border: '1px solid #e2e8f0', borderRadius: 10, color: '#0f172a' }}
              />
              {error && <p className="text-xs font-semibold" style={{ color: '#dc2626' }}>{error}</p>}
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: '#1b59ff', borderRadius: 10 }}
              >
                {c.btn}
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center gap-2 py-2">
            <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: '#16a34a' }}>{c.success}</span>
          </div>
        )}
      </div>
    </div>
  )
}
