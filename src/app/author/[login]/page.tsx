import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import authorsData from '@/data/authors.json'
import PostCard from '@/components/PostCard'

interface Props {
  params: Promise<{ login: string }>
}

function normalizeLogin(login: string): string {
  return login.toLowerCase().replace(/[@.]/g, '')
}

export async function generateStaticParams() {
  return authorsData.map((a) => ({ login: normalizeLogin(a.login) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { login } = await params
  const author = authorsData.find((a) => normalizeLogin(a.login) === login)
  if (!author) return {}
  return {
    title: `${author.displayName} | CrypOptionHub`,
    description: `Articles written by ${author.displayName} on CrypOptionHub.`,
    alternates: { canonical: `https://crypoptionhub.com/author/${login}/` },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { login } = await params
  const author = authorsData.find((a) => normalizeLogin(a.login) === login)
  if (!author) notFound()

  const posts = getAllPosts('en')
    .filter((p) => p.author === author.login || p.author === author.displayName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span style={{ color: '#64748b' }}>Authors</span>
        <span>/</span>
        <span style={{ color: '#64748b' }}>{author.displayName}</span>
      </nav>

      {/* Author header */}
      <div
        className="mb-10 flex flex-col items-center gap-5 px-8 py-10 text-center sm:flex-row sm:text-left"
        style={{ background: 'linear-gradient(135deg, #101923, #1e3a5f, #101923)', borderRadius: 24 }}
      >
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center text-3xl font-black text-white"
          style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
        >
          {author.firstName[0]}{author.lastName[0]}
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{author.displayName}</h1>
          <p className="mt-1 text-sm" style={{ color: '#94a3b8' }}>
            {posts.length} article{posts.length !== 1 ? 's' : ''} published on CrypOptionHub
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: '#64748b' }}>No published articles yet.</p>
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
