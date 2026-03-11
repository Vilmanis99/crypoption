import Link from 'next/link'

const CHANNEL_URL = 'https://www.youtube.com/@crypoptionhub'

const FEATURED_VIDEOS = [
  { id: 'pocket-option', title: 'Pocket Option Review & Tutorial', thumb: '/images/2024/10/Pocket-Option-Logo-No-BG.png' },
  { id: 'quotex', title: 'Quotex Platform Overview', thumb: '/images/2024/10/Quotex-Logo-No-BG.png.png' },
]

export default function YouTubeChannelCTA() {
  return (
    <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
      <div className="flex items-center gap-2 px-5 py-4" style={{ background: 'linear-gradient(135deg, #cc0000, #8b0000)' }}>
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
          <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="white" />
        </svg>
        <h3 className="font-bold text-white" style={{ fontSize: 15 }}>Video Tutorials</h3>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm" style={{ color: '#64748b' }}>
          Watch our latest trading tutorials and broker reviews on YouTube.
        </p>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full py-2.5 text-center text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: '#cc0000' }}
        >
          Subscribe on YouTube →
        </a>
      </div>
    </div>
  )
}
