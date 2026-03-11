'use client'

import { useState, useEffect } from 'react'
import { hasDismissedSticky, markStickyDismissed } from '@/lib/subscribers'

const COPY = {
  en: { text: 'Try Pocket Option — #1 Rated Broker for 2026', btn: 'Open Free Account', href: '/pocket/go-en' },
  ru: { text: 'Pocket Option — Лучший брокер 2026', btn: 'Открыть бесплатный счёт', href: '/pocket/go-rus' },
}

export default function StickyArticleCTA({ lang = 'en' }: { lang?: 'en' | 'ru' }) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    if (hasDismissedSticky()) return
    setDismissed(false)

    function onScroll() {
      setShow(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss() {
    markStickyDismissed()
    setDismissed(true)
  }

  if (dismissed || !show) return null

  const c = COPY[lang]

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', animation: 'slide-up-bar 0.3s ease-out', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        <p className="text-center text-sm font-semibold text-white sm:text-left">
          {c.text}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={c.href}
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
            className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#1b59ff', boxShadow: '0 0 16px rgba(27,89,255,0.3)' }}
          >
            {c.btn}
          </a>
          <button
            onClick={dismiss}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
