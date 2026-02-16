import Link from 'next/link'
import type { Post } from 'app/blog/utils'

export function BlogPosts({ posts }: { posts: Post[] }) {
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <div className="space-y-3">
      {sortedPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex gap-4 items-baseline"
        >
          <span className="text-sm tabular-nums w-28 flex-shrink-0" style={{ color: 'var(--fg-muted)' }}>
            {new Date(post.metadata.publishedAt).toLocaleDateString('en-us', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="group-hover:underline underline-offset-2" style={{ color: 'var(--fg)' }}>
            {post.metadata.title}
          </span>
        </Link>
      ))}
    </div>
  )
}
