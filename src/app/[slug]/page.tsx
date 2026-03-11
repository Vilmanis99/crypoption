import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getAllEnSlugs,
  getContentBySlug,
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
  return getAllEnSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getContentBySlug(slug)
  if (!post) return {}
  const title = post.seo.title || post.title
  const description = post.seo.description || post.excerpt
  return {
    title,
    description,
    alternates: {
      canonical: `https://crypoptionhub.com/${slug}/`,
      languages: {
        'en': `https://crypoptionhub.com/${slug}/`,
        'ru': `https://crypoptionhub.com/ru/${slug}/`,
        'x-default': `https://crypoptionhub.com/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://crypoptionhub.com/${slug}/`,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      siteName: 'CrypOptionHub',
      locale: 'en_US',
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

const BROKER_LOGOS = [
  { name: 'Pocket Option', img: '/images/2024/10/Pocket-Option-Logo-No-BG.png', href: '/pocket/go-en', review: '/pocket-option/' },
  { name: 'Quotex',        img: '/images/2024/10/Quotex-Logo-No-BG.png.png',    href: '/quotex/go-en',  review: '/quotex/' },
  { name: 'IQ Option',     img: '/images/2024/10/IQ-Option-Logo-Square.png',    href: '/iq-option/go-en', review: '/iq-option/' },
  { name: 'Binomo',        img: '/images/2024/10/Binomo-Logo-Square.png',       href: '/binomo/go-en',  review: '/binomo/' },
]

function normalizeLogin(login: string): string {
  return login.toLowerCase().replace(/[@.]/g, '')
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getContentBySlug(slug)
  if (!post) notFound()

  const html = cleanContent(post.content)
  const headings = extractHeadings(html)
  const faqItems = extractFaqItems(post.content)

  // Score-based related articles: shared categories (3pts each) + shared tags (1pt each)
  const allEnPosts = getAllPosts('en').filter(p => p.slug !== post.slug)
  const scored = allEnPosts.map(p => {
    let score = 0
    score += p.categories.filter(c => post.categories.includes(c)).length * 3
    score += p.tags.filter(t => post.tags.includes(t)).length
    return { post: p, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const related = scored.filter(s => s.score > 0).slice(0, 6).map(s => s.post)

  // Pick 2 related articles to show as mid-article recommendations
  const midArticleRecs = related.slice(0, 2)

  const author = authorsData.find(
    a => a.login === post.author || a.displayName === post.author
  )
  const authorPostCount = author
    ? getAllPosts('en').filter(p => p.author === author.login || p.author === author.displayName).length
    : 0

  const postUrl = `https://crypoptionhub.com/${post.slug}/`
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
        name: 'Home',
        item: 'https://crypoptionhub.com/',
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
            <Link href="/" className="hover:underline">Home</Link>
            {post.categories[0] && (
              <>
                <span>/</span>
                <Link href={`/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}/`} className="hover:underline">
                  {post.categories[0]}
                </Link>
              </>
            )}
            <span>/</span>
            <span style={{ color: '#64748b' }} className="line-clamp-1">{post.title}</span>
          </nav>

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
                ✓ Updated {formatDate(post.modified)}
              </span>
            )}
            {author && (
              <Link href={`/author/${normalizeLogin(author.login)}/`} className="text-xs hover:underline" style={{ color: '#94a3b8' }}>
                by {author.displayName}
              </Link>
            )}
          </div>

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Body */}
          <div
            className="wp-content prose prose-lg max-w-none"
            style={{ fontSize: 17, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Mid-article recommended reading */}
          <RecommendedReading articles={midArticleRecs.map(r => ({ slug: r.slug, title: r.title, featuredImage: r.featuredImage, excerpt: r.excerpt }))} />

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
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7adeff' }}>Written by</p>
                <Link
                  href={`/author/${normalizeLogin(author.login)}/`}
                  className="mt-0.5 block font-black text-white hover:underline"
                  style={{ fontSize: 16 }}
                >
                  {author.displayName}
                </Link>
                <p className="mt-0.5 text-xs" style={{ color: '#94a3b8' }}>
                  {authorPostCount} article{authorPostCount !== 1 ? 's' : ''} published on CrypOptionHub
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
              <h3 className="mb-5 font-black" style={{ fontSize: 22, color: '#101923' }}>You Might Also Like</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/${r.slug}/`}
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

            {/* Top Brokers widget */}
            <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
                <h3 className="font-bold text-white" style={{ fontSize: 15 }}>Top Brokers</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {BROKER_LOGOS.map(b => (
                  <li key={b.name} className="flex items-center justify-between gap-3 px-4 py-3">
                    <Link href={b.review} className="flex items-center gap-3">
                      <img src={b.img} alt={b.name} loading="lazy" className="h-8 w-16 object-contain" />
                      <span className="text-sm font-semibold" style={{ color: '#374a5d' }}>{b.name}</span>
                    </Link>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ background: '#1b59ff' }}
                    >
                      Visit
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4">
                <Link
                  href="/brokers/"
                  className="mt-2 block w-full rounded-full py-2 text-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}
                >
                  View All Brokers →
                </Link>
              </div>
            </div>

            {/* Email signup widget */}
            <InlineEmailCapture variant="compact" />

            {/* YouTube CTA */}
            <YouTubeChannelCTA />

            {/* Categories widget */}
            <div className="overflow-hidden" style={{ borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #101923, #374a5d)' }}>
                <h3 className="font-bold text-white" style={{ fontSize: 15 }}>Categories</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  ['Brokers', '/brokers/'],
                  ['Strategies', '/category/strategies/'],
                  ['Signals', '/category/signals/'],
                  ['Demo Accounts', '/category/demo-accounts/'],
                  ['Learn', '/category/learn/'],
                  ['Bots', '/category/bots/'],
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
      <StickyArticleCTA lang="en" />
    </div>
  )
}
