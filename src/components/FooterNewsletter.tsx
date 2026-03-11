'use client'

import { useState } from 'react'
import { saveSubscriber } from '@/lib/subscribers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) { setError('Please enter a valid email.'); return }
    saveSubscriber(email, 'footer')
    setSubmitted(true)
  }

  return (
    <div className="mb-10 pb-10" style={{ borderBottom: '1px solid #1e2e40' }}>
      <div className="mx-auto max-w-lg text-center">
        <h3 className="mb-2 font-black text-white" style={{ fontSize: 22 }}>
          Join 1,000+ Traders Getting Weekly Insights
        </h3>
        <p className="mb-6 text-sm" style={{ color: '#94a3b8' }}>
          Proven strategies, honest broker reviews, and market analysis — delivered to your inbox every week.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-0">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="Enter your email"
              className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none"
              style={{
                background: '#0d151f',
                border: '1px solid #1e2e40',
                borderRight: 'none',
                borderRadius: '12px 0 0 12px',
                color: '#fff',
              }}
            />
            <button
              type="submit"
              className="shrink-0 px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', borderRadius: '0 12px 12px 0' }}
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="font-semibold text-emerald-400">Welcome aboard! Check your inbox.</span>
          </div>
        )}
        {error && !submitted && <p className="mt-2 text-xs font-semibold" style={{ color: '#f87171' }}>{error}</p>}
      </div>
    </div>
  )
}
