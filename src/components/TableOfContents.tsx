import type { Heading } from '@/lib/content'

interface Props {
  headings: Heading[]
  lang?: string
}

export default function TableOfContents({ headings, lang }: Props) {
  if (headings.length < 3) return null
  const isRu = lang === 'ru'

  return (
    <nav
      className="mb-8 overflow-hidden"
      style={{ borderRadius: 14, border: '1px solid #e2e8f0', background: '#f8fafc' }}
      aria-label="Table of contents"
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ background: 'linear-gradient(135deg, #101923, #374a5d)', borderRadius: '14px 14px 0 0' }}
      >
        <span className="text-base">📋</span>
        <span className="text-sm font-bold text-white">{isRu ? 'Содержание' : 'Table of Contents'}</span>
      </div>
      <ol className="px-5 py-4 space-y-1">
        {headings.map((h, i) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? 16 : 0 }}
          >
            <a
              href={`#${h.id}`}
              className="flex items-start gap-2 py-0.5 text-sm transition-colors hover:underline"
              style={{ color: h.level === 2 ? '#1d4ed8' : '#374a5d' }}
            >
              <span className="shrink-0 font-semibold" style={{ color: '#94a3b8', minWidth: 20 }}>
                {h.level === 2 ? `${i + 1}.` : '›'}
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
