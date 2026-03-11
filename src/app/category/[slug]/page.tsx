import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from '@/lib/content'
import PostCard from '@/components/PostCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  const desc = category.description.replace(/<[^>]+>/g, '').trim()
  return {
    title: `${category.name} | CrypOptionHub`,
    description: desc || `Browse all ${category.name} articles on CrypOptionHub.`,
    alternates: { canonical: `https://crypoptionhub.com/category/${slug}/` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const posts = getPostsByCategory(category.name)
    .filter((p) => p.language === 'en')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header
        className="mb-10 px-8 py-10 text-white"
        style={{ background: 'linear-gradient(135deg, #101923, #374a5d)', borderRadius: 20 }}
      >
        <h1 className="font-black" style={{ fontSize: 'clamp(24px,4vw,36px)' }}>{category.name}</h1>
        {category.description && (
          <div
            className="mt-3 text-sm leading-relaxed max-w-2xl"
            style={{ color: '#94a3b8' }}
            dangerouslySetInnerHTML={{
              __html: category.description.replace(/<h1[^>]*>.*?<\/h1>/gi, ''),
            }}
          />
        )}
        <p className="mt-4 text-xs font-semibold" style={{ color: '#7adeff' }}>
          {posts.length} article{posts.length !== 1 ? 's' : ''}
        </p>
      </header>

      {posts.length === 0 ? (
        <p style={{ color: '#64748b' }}>No posts in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
