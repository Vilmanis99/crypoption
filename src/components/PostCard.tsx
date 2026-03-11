import Link from 'next/link'
import { formatDate } from '@/lib/content'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
      style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff' }}
    >
      {post.featuredImage && (
        <Link href={`/${post.slug}/`} className="block overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
        {post.categories[0] && (
          <Link
            href={`/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}/`}
            className="mb-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: '#0284c7' }}
          >
            {post.categories[0]}
          </Link>
        )}
        <Link href={`/${post.slug}/`}>
          <h3
            className="mb-2 font-bold leading-snug line-clamp-2 transition-colors group-hover:text-blue-600"
            style={{ fontSize: 17, color: '#0f172a' }}
          >
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mb-4 text-sm leading-relaxed line-clamp-2" style={{ color: '#64748b' }}>
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <time className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(post.date)}</time>
          <Link
            href={`/${post.slug}/`}
            className="rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#1b59ff' }}
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  )
}
