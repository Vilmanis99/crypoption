import Link from 'next/link'
import Image from 'next/image'
import FooterNewsletter from './FooterNewsletter'

const CONTENT = [
  ['Brokers', '/brokers/'],
  ['Strategies', '/category/strategies/'],
  ['Signals', '/category/signals/'],
  ['Demo Accounts', '/category/demo-accounts/'],
  ['Learn', '/category/learn/'],
  ['Bots', '/category/bots/'],
]

const SITE = [
  ['About', '/about/'],
  ['Authors', '/authors/'],
  ['Contact', '/contact/'],
  ['Privacy Policy', '/privacy-policy/'],
  ['Disclaimers', '/disclaimers/'],
]

const SOCIAL = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@CrypOptionHub',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/crypoptionhub/',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@crypoptionhub',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/crypoptionhub',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#101923', color: '#94a3b8' }}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <FooterNewsletter />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <Link href="/">
              <Image
                src="/images/2024/09/Dark-BG-Logo-e1726598075350.png"
                alt="CrypOptionHub"
                width={200}
                height={50}
                className="mb-4 h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#94a3b8' }}>
              Expert reviews of binary options brokers, trading strategies,
              signals, and educational content for traders worldwide.
            </p>
            {/* Social links */}
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
                  style={{ background: '#1e2e40' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Payment method badges */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs" style={{ color: '#4a5568' }}>Accepted:</span>
              {['Visa', 'MasterCard', 'Bitcoin', 'USDT'].map(method => (
                <span
                  key={method}
                  className="rounded px-2 py-0.5 text-xs font-semibold"
                  style={{ background: '#1e2e40', color: '#94a3b8' }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold" style={{ color: '#e2e8f0' }}>Content</p>
            <ul className="space-y-2">
              {CONTENT.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: '#94a3b8' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold" style={{ color: '#e2e8f0' }}>Site</p>
            <ul className="space-y-2">
              {SITE.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: '#94a3b8' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div
          className="mt-10 rounded-xl px-5 py-4 text-xs leading-relaxed"
          style={{ background: '#0d151f', border: '1px solid #1e2e40', color: '#6b7a8d' }}
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Risk Disclaimer</p>
          <p>
            Trading binary options and other financial instruments involves significant risk of loss and is not suitable for all investors.
            You should not invest money that you cannot afford to lose. The content on this website is for informational and educational purposes only
            and does not constitute financial advice. Past performance is not indicative of future results.
          </p>
        </div>

        <div
          className="mt-6 flex flex-col items-center justify-between gap-3 pt-6 text-xs sm:flex-row"
          style={{ borderTop: '1px solid #1e2e40', color: '#4a5568' }}
        >
          <p>&copy; {new Date().getFullYear()} CrypOptionHub. All rights reserved.</p>
          <p>Not financial advice. Trade responsibly.</p>
        </div>
      </div>
    </footer>
  )
}
