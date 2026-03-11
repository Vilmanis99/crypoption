'use client'

import { useState, useEffect, useCallback } from 'react'
import { saveSubscriber, hasSeenPopup, markPopupSeen } from '@/lib/subscribers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const show = useCallback(() => {
    setVisible(true)
    markPopupSeen()
  }, [])

  useEffect(() => {
    if (hasSeenPopup()) return

    const timer = setTimeout(show, 20000)

    function onScroll() {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPct >= 0.5) {
        show()
        window.removeEventListener('scroll', onScroll)
        clearTimeout(timer)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [show])

  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    saveSubscriber(email, 'popup')
    setSubmitted(true)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fade-in 0.2s ease-out' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative w-full max-w-md"
        style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px, 5vw, 32px)', animation: 'slide-up-modal 0.3s ease-out', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          aria-label="Close popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Free Download
            </div>

            <h3 className="mb-2 font-black leading-tight" style={{ fontSize: 24, color: '#0f172a' }}>
              Get Your Free Broker Comparison Cheat Sheet
            </h3>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Plus 3 proven strategies that our traders use daily. Join 1,000+ traders who trade smarter.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                inputMode="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="Enter your email address"
                className="mb-3 w-full px-4 py-3.5 text-sm outline-none transition-all focus:ring-2"
                style={{ border: '1px solid #e2e8f0', borderRadius: 12, color: '#0f172a', background: '#fff' }}
              />
              {error && <p className="mb-2 text-xs font-semibold" style={{ color: '#dc2626' }}>{error}</p>}
              <button
                type="submit"
                className="w-full py-3.5 font-bold text-white transition-all hover:opacity-90"
                style={{ background: '#1b59ff', borderRadius: 12, boxShadow: '0 0 24px rgba(27,89,255,0.3)', fontSize: 15 }}
              >
                Get Free Access
              </button>
            </form>

            <p className="mt-3 text-center text-xs" style={{ color: '#94a3b8' }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: '#f0fdf4' }}
            >
              <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="mb-2 font-black" style={{ fontSize: 22, color: '#0f172a' }}>
              You&apos;re in! Check your inbox.
            </h3>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              Your cheat sheet is on its way. While you wait, start trading with our #1 rated broker:
            </p>
            <a
              href="/pocket/go-en"
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.3)' }}
            >
              Try Pocket Option Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
