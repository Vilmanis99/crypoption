'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const POCKET_OPTION_LINKS = [
  { label: 'Full Review',      href: '/pocket-option-review/' },
  { label: 'Best Strategies',  href: '/pocket-option-strategy/' },
  { label: 'Demo Account',     href: '/pocket-option-demo/' },
  { label: 'Promo Codes',      href: '/pocket-option-promo-codes/' },
  { label: 'How to Register',  href: '/pocket-option-registration/' },
  { label: 'How to Login',     href: '/pocket-option-login/' },
  { label: 'How to Deposit',   href: '/pocket-option-deposit/' },
  { label: 'How to Withdraw',  href: '/pocket-option-withdrawal/' },
  { label: 'Copy Trading',     href: '/pocket-option-copy-trading/' },
  { label: 'AI Trading',       href: '/pocket-option-ai-trading/' },
  { label: 'Free Signals',     href: '/pocket-option-signals-review/' },
]

const NAV = [
  { label: 'Brokers',       href: '/brokers/' },
  { label: 'Compare',       href: '/compare/' },
  { label: 'Strategies',    href: '/strategies/' },
  { label: 'Signals',       href: '/category/signals/' },
  { label: 'Demo Accounts', href: '/category/demo-accounts/' },
  { label: 'Learn',         href: '/category/learn/' },
]

const NAV_RU = [
  { label: 'Брокеры',    href: '/ru/brokery/' },
  { label: 'Сравнение',  href: '/ru/compare/' },
  { label: 'Стратегии',  href: '/ru/blog/' },
  { label: 'Сигналы',    href: '/ru/blog/' },
  { label: 'Демо-счета', href: '/ru/blog/' },
  { label: 'Обучение',   href: '/ru/blog/' },
]

export default function Header() {
  const [poOpen, setPoOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isRu = pathname.startsWith('/ru/')

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href.replace(/\/$/, '') + '/')
  }

  return (
    <header className="sticky top-0 z-50" style={{ background: '#101923' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/crypoption-logo.webp"
            alt="CrypOptionHub"
            width={200}
            height={50}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Pocket Option dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPoOpen(true)}
            onMouseLeave={() => setPoOpen(false)}
          >
            <Link
              href="/pocket-option/"
              className="flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                color: isActive('/pocket-option/') ? '#7adeff' : '#cbd5e1',
              }}
              aria-expanded={poOpen}
              aria-haspopup="true"
              onFocus={() => setPoOpen(true)}
              onBlur={() => setPoOpen(false)}
            >
              Pocket Option
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {poOpen && (
              <div
                className="absolute left-0 top-full min-w-[210px] overflow-hidden rounded-xl py-1 shadow-xl"
                style={{ background: '#0d151f', border: '1px solid #1e2e40' }}
                role="menu"
              >
                {POCKET_OPTION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                    style={{ color: '#94a3b8' }}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {(isRu ? NAV_RU : NAV).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                color: isActive(link.href) ? '#7adeff' : '#cbd5e1',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language switcher pill + hamburger */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex overflow-hidden rounded-lg text-xs font-bold" style={{ border: '1px solid #374a5d' }}>
            <Link
              href="/"
              className="px-3 py-1.5 transition-colors"
              style={{
                background: !isRu ? '#1b59ff' : 'transparent',
                color: !isRu ? '#fff' : '#94a3b8',
              }}
            >
              EN
            </Link>
            <Link
              href="/ru/"
              className="px-3 py-1.5 transition-colors"
              style={{
                background: isRu ? '#1b59ff' : 'transparent',
                color: isRu ? '#fff' : '#94a3b8',
                borderLeft: '1px solid #374a5d',
              }}
            >
              RU
            </Link>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
            style={{ border: '1px solid #374a5d' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#cbd5e1" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: '#0d151f', borderTop: '1px solid #1e2e40', maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
          <nav className="flex flex-col px-4 py-3">
            <Link href="/pocket-option/" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-bold" style={{ color: '#7adeff', borderBottom: '1px solid #1e2e40' }}>
              Pocket Option
            </Link>
            {POCKET_OPTION_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm" style={{ color: '#94a3b8', borderBottom: '1px solid rgba(30,46,64,0.5)' }}>
                {link.label}
              </Link>
            ))}
            {(isRu ? NAV_RU : NAV).map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-bold" style={{ color: '#cbd5e1', borderBottom: '1px solid #1e2e40' }}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
