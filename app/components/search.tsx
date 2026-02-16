'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Post } from 'app/blog/utils'

export function Search({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return posts.slice(0, 5)
    }

    const searchQuery = query.toLowerCase()
    return posts.filter((post) => {
      const titleMatch = post.metadata.title.toLowerCase().includes(searchQuery)
      const summaryMatch = post.metadata.summary.toLowerCase().includes(searchQuery)
      const contentMatch = post.content.toLowerCase().includes(searchQuery)
      return titleMatch || summaryMatch || contentMatch
    })
  }, [query, posts])

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search blog posts..."
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--bg)',
            color: 'var(--fg)',
            border: '1px solid var(--border)',
          }}
          aria-label="Search blog posts"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        {isFocused && filteredPosts.length > 0 && (
          <ul
            id="search-results"
            className="absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
            }}
            role="listbox"
          >
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block px-4 py-2 transition-colors"
                  style={{ color: 'var(--fg)' }}
                  onMouseDown={() => setIsFocused(false)}
                  role="option"
                >
                  <p className="font-medium">{post.metadata.title}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--fg-muted)' }}>
                    {post.metadata.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isFocused && filteredPosts.length === 0 && query.trim() && (
          <div
            className="absolute z-10 w-full mt-1 rounded-lg shadow-lg px-4 py-2"
            style={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--fg-muted)',
            }}
            role="status"
            aria-live="polite"
          >
            <p>No posts found</p>
          </div>
        )}
      </div>
    </div>
  )
}
