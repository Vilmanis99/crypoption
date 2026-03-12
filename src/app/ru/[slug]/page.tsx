import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getAllRuSlugs,
  getPostBySlug,
  getAllPosts,
  cleanContent,
  extractHeadings,
  extractFaqItems,
  formatDate,
} from '@/lib/content'
import authorsData from '@/data/authors.json'
import TableOfContents from '@/components/TableOfContents'
import StickyArticleCTA from '@/components/StickyArticleCTA'
import InlineEmailCapture from '@/components/InlineEmailCapture'
import RecommendedReading from '@/components/RecommendedReading'
import YouTubeChannelCTA from '@/components/YouTubeChannelCTA'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRuSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.language !== 'ru') return {}
  const title = post.seo.title || post.title
  const description = post.seo.description || post.excerpt
  return {
    title,
    description,
    alternates: {
      canonical: `https://crypoptionhub.com/ru/${slug}/`,
      languages: {
        'en': `https://crypoptionhub.com/${slug}/`,
        'ru': `https://crypoptionhub.com/ru/${slug}/`,
        'x-default': `https://crypoptionhub.com/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://crypoptionhub.com/ru/${slug}/`,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      siteName: 'CrypOptionHub',
      locale: 'ru_RU',
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

const BROKER_LOGOS_RU = [
  { name: 'Pocket Option', img: '/images/2024/10/Pocket-Option-Logo-No-BG.png', href: '/pocket/go-rus', review: '/ru/obzor-pocket-option/', slugKey: 'pocket-option' },
  { name: 'Quotex',        img: '/images/2024/10/Quotex-Logo-No-BG.png.png',    href: '/quotex/go-en',  review: '/ru/obzor-quotex/', slugKey: 'quotex' },
  { name: 'IQ Option',     img: '/images/2024/10/IQ-Option-Logo-Square.png',    href: '/iq-option/go-en', review: '/ru/obzor-iq-option/', slugKey: 'iq-option' },
  { name: 'Binomo',        img: '/images/2024/10/Binomo-Logo-Square.png',       href: '/binomo/go-en',  review: '/ru/obzor-binomo/', slugKey: 'binomo' },
]

// Determine article intent for context-aware CTAs
function getArticleIntent(slug: string, categories: string[], title: string) {
  const s = slug.toLowerCase()
  const t = title.toLowerCase()
  if (s.includes('promo') || s.includes('промокод') || t.includes('промокод') || t.includes('promo')) return 'promo'
  if (s.includes('-vs-') || t.includes(' vs ') || t.includes(' против ')) return 'comparison'
  if (categories.includes('Strategies') || s.includes('strateg') || s.includes('индикатор') || s.includes('pattern') || s.includes('скальпинг')) return 'strategy'
  if (s.includes('росси') || s.includes('казахстан') || s.includes('украин') || s.includes('беларус')) return 'country'
  if (categories.includes('Demo Accounts') || s.includes('demo') || s.includes('демо')) return 'demo'
  if (categories.includes('Brokers') || s.includes('обзор') || s.includes('review')) return 'broker'
  return 'general'
}

// Find which broker this article is about (if any)
function getRelevantBroker(slug: string, title: string) {
  const text = (slug + ' ' + title).toLowerCase()
  if (text.includes('pocket option') || text.includes('pocket-option') || text.includes('покет опшн')) return 'pocket-option'
  if (text.includes('quotex') || text.includes('квотекс')) return 'quotex'
  if (text.includes('iq option') || text.includes('iq-option')) return 'iq-option'
  if (text.includes('binomo') || text.includes('биномо')) return 'binomo'
  return null
}

function normalizeLogin(login: string): string {
  return login.toLowerCase().replace(/[@.]/g, '')
}

export default async function RuPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.language !== 'ru') notFound()

  const html = cleanContent(post.content)
  const headings = extractHeadings(html)
  const faqItems = extractFaqItems(post.content)

  const intent = getArticleIntent(slug, post.categories, post.title)
  const relevantBroker = getRelevantBroker(slug, post.title)

  // Sort broker logos so the relevant one appears first
  const sortedBrokers = relevantBroker
    ? [...BROKER_LOGOS_RU.filter(b => b.slugKey === relevantBroker), ...BROKER_LOGOS_RU.filter(b => b.slugKey !== relevantBroker)]
    : BROKER_LOGOS_RU

  // Score-based related articles: shared categories (3pts each) + shared tags (1pt each)
  const allRuPosts = getAllPosts('ru').filter(p => p.slug !== post.slug)
  const scored = allRuPosts.map(p => {
    let score = 0
    score += p.categories.filter(c => post.categories.includes(c)).length * 3
    score += p.tags.filter(t => post.tags.includes(t)).length
    return { post: p, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const related = scored.filter(s => s.score > 0).slice(0, 6).map(s => s.post)

  // Pick 2 related articles for mid-article recommendations
  const midArticleRecs = related.slice(0, 2)

  const author = authorsData.find(
    a => a.login === post.author || a.displayName === post.author
  )
  const authorPostCount = author
    ? getAllPosts('ru').filter(p => p.author === author.login || p.author === author.displayName).length
    : 0

  const postUrl = `https://crypoptionhub.com/ru/${post.slug}/`
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    image: post.featuredImage || 'https://crypoptionhub.com/images/2024/09/Dark-BG-Logo-e1726598075350.png',
    datePublished: post.date,
    dateModified: post.modified || post.date,
    url: postUrl,
    author: {
      '@type': 'Person',
      name: author ? author.displayName : post.author,
      url: author ? `https://crypoptionhub.com/author/${normalizeLogin(author.login)}/` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CrypOptionHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://crypoptionhub.com/images/2024/09/Dark-BG-Logo-e1726598075350.png',
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://crypoptionhub.com/ru/',
      },
      ...(post.categories[0]
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: post.categories[0],
              item: `https://crypoptionhub.com/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}/`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: postUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 2,
              name: post.title,
              item: postUrl,
            },
          ]),
    ],
  }

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">

        {/* ── Article ── */}
        <article>
          {/* Breadcrumb */}
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
            <Link href="/ru/" className="hover:underline">Главная</Link>
            {post.categories[0] && (
              <>
                <span>/</span>
                <Link href={`/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}/`} className="hover:underline" style={{ color: '#64748b' }}>{post.categories[0]}</Link>
              </>
            )}
            <span>/</span>
            <span style={{ color: '#64748b' }} className="line-clamp-1">{post.title}</span>
          </nav>

          {/* New here? bar */}
          <Link
            href="/ru/torgovlja-binarnymi-opcionami/"
            className="mb-6 flex items-center gap-3 rounded-xl p-3 transition-all hover:shadow-md"
            style={{ background: '#f0f7ff', border: '1px solid #d0e3f7' }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm" style={{ background: '#1b59ff', color: '#fff' }}>?</span>
            <span className="flex-1 text-sm" style={{ color: '#374a5d' }}>
              <strong>Новичок в бинарных опционах?</strong> Начните с нашего гида для начинающих
            </span>
            <span className="hidden text-xs font-bold sm:inline" style={{ color: '#1b59ff' }}>Читать гид →</span>
          </Link>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="mb-6 mx-auto block max-w-full object-contain"
              style={{ borderRadius: 16, maxHeight: 420 }}
            />
          )}

          <h1 className="mb-4 font-black leading-tight" style={{ fontSize: 'clamp(24px,4vw,36px)', color: '#0f172a' }}>
            {post.title}
          </h1>

          {/* Meta bar */}
          <div className="mb-6 flex flex-wrap items-center gap-3 pb-5" style={{ borderBottom: '1px solid #e2e8f0', fontSize: 14 }}>
            {post.categories.map(cat => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}/`}
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: '#eef4fe', color: '#1d4ed8' }}
              >
                {cat}
              </Link>
            ))}
            {post.date && (
              <time dateTime={post.date} style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
            )}
            {post.modified && post.modified !== post.date && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{ background: '#f0fdf4', color: '#16a34a' }}
              >
                ✓ Обновлено {formatDate(post.modified)}
              </span>
            )}
            {author && (
              <Link href={`/author/${normalizeLogin(author.login)}/`} className="text-xs hover:underline" style={{ color: '#94a3b8' }}>
                автор: {author.displayName}
              </Link>
            )}
          </div>

          {/* Table of Contents */}
          <TableOfContents headings={headings} lang="ru" />

          {/* Body */}
          <div
            className="wp-content prose prose-lg max-w-none"
            style={{ fontSize: 17, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Intent-based CTA */}
          {intent === 'promo' && (
            <div className="my-8 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', border: '1px solid #1e3a5f' }}>
              <p className="mb-2 text-lg font-black text-white">Готовы использовать промокод?</p>
              <p className="mb-4 text-sm" style={{ color: '#94a3b8' }}>Откройте аккаунт и введите промокод при пополнении</p>
              <a href="/pocket/go-rus" target="_blank" rel="nofollow noopener noreferrer sponsored" className="inline-block rounded-xl px-8 py-3 font-bold text-white" style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.3)' }}>
                Открыть аккаунт
              </a>
            </div>
          )}
          {intent === 'strategy' && (
            <div className="my-8 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', border: '1px solid #1e3a5f' }}>
              <p className="mb-2 text-lg font-black text-white">Попробуйте эту стратегию без риска</p>
              <p className="mb-4 text-sm" style={{ color: '#94a3b8' }}>Практикуйтесь на демо-счёте с $50,000 виртуальных средств</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/pocket/go-rus" target="_blank" rel="nofollow noopener noreferrer sponsored" className="inline-block rounded-xl px-7 py-3 font-bold text-white" style={{ background: '#1b59ff' }}>
                  Открыть демо
                </a>
                <Link href="/ru/demo-schet-pocket-option/" className="inline-block rounded-xl border px-7 py-3 font-bold" style={{ borderColor: '#2a3f55', color: '#7adeff' }}>
                  О демо-счёте
                </Link>
              </div>
            </div>
          )}
          {intent === 'comparison' && (
            <div className="my-8 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', border: '1px solid #1e3a5f' }}>
              <p className="mb-2 text-lg font-black text-white">Все сравнения брокеров</p>
              <p className="mb-4 text-sm" style={{ color: '#94a3b8' }}>Сравните выплаты, платформы и функции</p>
              <Link href="/ru/compare/" className="inline-block rounded-xl px-8 py-3 font-bold text-white" style={{ background: '#1b59ff' }}>
                Все сравнения →
              </Link>
            </div>
          )}
          {intent === 'country' && (
            <div className="my-8 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', border: '1px solid #1e3a5f' }}>
              <p className="mb-2 text-lg font-black text-white">Брокеры по странам</p>
              <p className="mb-4 text-sm" style={{ color: '#94a3b8' }}>Найдите лучшего брокера с местными методами пополнения</p>
              <Link href="/ru/countries/" className="inline-block rounded-xl px-8 py-3 font-bold text-white" style={{ background: '#1b59ff' }}>
                Все страны →
              </Link>
            </div>
          )}
          {(intent === 'demo' || intent === 'broker' || intent === 'general') && (
            <div className="my-8 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #101923, #1a2b3d)', border: '1px solid #1e3a5f' }}>
              <p className="mb-2 text-lg font-black text-white">Сравните лучших брокеров</p>
              <p className="mb-4 text-sm" style={{ color: '#94a3b8' }}>Реальные тесты с реальными деньгами — честные обзоры</p>
              <Link href="/ru/brokers/" className="inline-block rounded-xl px-8 py-3 font-bold text-white" style={{ background: '#1b59ff' }}>
                Сравнить брокеров →
              </Link>
            </div>
          )}

          {/* Mid-article recommended reading */}
          <RecommendedReading articles={midArticleRecs.map(r => ({ slug: r.slug, title: r.title, featuredImage: r.featuredImage, excerpt: r.excerpt }))} lang="ru" />

          {/* Author bio box */}
          {author && (
            <div
              className="mt-10 flex items-center gap-5 p-5"
              style={{ borderRadius: 16, background: 'linear-gradient(135deg, #101923, #374a5d)' }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center text-lg font-black text-white"
                style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }}
              >
                {author.firstName[0]}{author.lastName[0]}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7adeff' }}>Автор</p>
                <Link
                  href={`/author/${normalizeLogin(author.login)}/`}
                  className="mt-0.5 block font-black text-white hover:underline"
                  style={{ fontSize: 16 }}
                >
                  {author.displayName}
                </Link>
                <p className="mt-0.5 text-xs" style={{ color: '#94a3b8' }}>
                  {authorPostCount} статей на CrypOptionHub
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 pt-6" style={{ borderTop: '1px solid #e2e8f0' }}>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ background: '#f1f5f9', color: '#64748b' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* You might also like */}
          {related.length > 0 && (
            <section className="mt-12">
              <h3 className="mb-5 font-black" style={{ fontSize: 22, color: '#101923' }}>Читайте также</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/ru/${r.slug}/`}
                    className="flex gap-3 overflow-hidden transition-shadow hover:shadow-md"
                    style={{ borderRadius: 14, border: '1px solid #e2e8f0', background: '#fff', padding: 14 }}
                  >
                    {r.featuredImage && (
                      <img src={r.featuredImage} alt={r.title} loading="lazy" className="h-16 w-20 shrink-0 object-cover" style={{ borderRadius: 8 }} />
                    )}
                    <div>
                      <p className="font-bold leading-snug line-clamp-2" style={{ fontSize: 14, color: '#0f172a' }}>{r.title}</p>
                      <p className="mt-1 text-xs" style={{ color: '#94a3b8' }}>{formatDate(r.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ── Sidebar ── */}
        <aside className="mt-10 space-y-6 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-6">

            {/* Top Brokers widget — context-aware */}
            <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
                <h3 className="font-bold text-white" style={{ fontSize: 15 }}>
                  {relevantBroker ? 'Рекомендуемый брокер' : 'Лучшие брокеры'}
                </h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {sortedBrokers.map(b => (
                  <li
                    key={b.name}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                    style={b.slugKey === relevantBroker ? { background: '#f0f7ff', borderLeft: '3px solid #1b59ff' } : {}}
                  >
                    <Link href={b.review} className="flex items-center gap-3">
                      <img src={b.img} alt={b.name} loading="lazy" className="h-8 w-16 object-contain" />
                      <span className="text-sm font-semibold" style={{ color: b.slugKey === relevantBroker ? '#1b59ff' : '#374a5d' }}>{b.name}</span>
                    </Link>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ background: '#1b59ff' }}
                    >
                      Открыть
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4">
                <Link
                  href="/ru/brokers/"
                  className="mt-2 block w-full rounded-full py-2 text-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}
                >
                  Все брокеры →
                </Link>
              </div>
            </div>

            {/* Email signup widget */}
            <InlineEmailCapture variant="compact" lang="ru" />

            {/* YouTube CTA */}
            <YouTubeChannelCTA lang="ru" />

            {/* Explore widget */}
            <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
                <h3 className="font-bold text-white" style={{ fontSize: 15 }}>Разделы</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  ['Обзоры брокеров', '/ru/brokers/'],
                  ['Сравнения брокеров', '/ru/compare/'],
                  ['Брокеры по странам', '/ru/countries/'],
                  ['Стратегии', '/category/strategies/'],
                  ['Сигналы', '/category/signals/'],
                  ['Обучение', '/category/learn/'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
                      style={{ color: '#374a5d' }}
                    >
                      <span>{label}</span>
                      <span style={{ color: '#94a3b8' }}>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </aside>
      </div>
      <StickyArticleCTA lang="ru" />
    </div>
  )
}
