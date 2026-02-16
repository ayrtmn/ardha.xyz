import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'
import fs from 'fs'
import path from 'path'

function getBio(): string {
  const bioPath = path.join(process.cwd(), 'content', 'bio.md')
  return fs.readFileSync(bioPath, 'utf-8')
}

export default function Page() {
  const posts = getBlogPosts()
  const bio = getBio()

  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  }).slice(0, 5)

  return (
    <section>
      <div className="text-lg leading-relaxed mb-8" style={{ color: 'var(--fg-secondary)' }}>
        {bio.split('\n\n').map((paragraph, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : ''}>{paragraph}</p>
        ))}
      </div>

      <div className="flex gap-4 text-sm mb-10 md:mb-12" style={{ color: 'var(--fg-muted)' }}>
        <a 
          href="mailto:mail@ardha.xyz" 
          className="hover:opacity-70 transition-opacity"
        >
          email
        </a>
        <span style={{ color: 'var(--border)' }}>·</span>
        <a 
          href="https://github.com/ardhaxyz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
        >
          github
        </a>
        <span style={{ color: 'var(--border)' }}>·</span>
        <a 
          href="https://x.com/ardhaxyz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
        >
          twitter
        </a>
      </div>

      <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <h2 className="text-sm font-medium mb-4" style={{ color: 'var(--fg)' }}>
          Latest
        </h2>
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row md:gap-4 md:items-baseline mb-2">
                <span className="text-sm tabular-nums md:w-28 flex-shrink-0" style={{ color: 'var(--fg-muted)' }}>
                  {new Date(post.metadata.publishedAt).toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="group-hover:underline underline-offset-2 font-medium" style={{ color: 'var(--fg)' }}>
                  {post.metadata.title}
                </span>
              </div>
              <p className="text-sm md:ml-32 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                {post.metadata.summary}
              </p>
            </Link>
          ))}
        </div>
        {posts.length > 5 && (
          <Link 
            href="/blog" 
            className="inline-block mt-4 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--fg-muted)' }}
          >
            View all →
          </Link>
        )}
      </div>
    </section>
  )
}
