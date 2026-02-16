'use client'

import { BlogPosts } from 'app/components/posts'
import { Search } from 'app/components/search'
import { TagsFilter } from 'app/components/tags-filter'
import type { Post } from 'app/blog/utils'
import { useState, useMemo } from 'react'

export function BlogClient({ posts }: { posts: Post[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts
    }
    return posts.filter((post) => {
      const postTags = post.metadata.tags || []
      return selectedTags.every((tag) => postTags.includes(tag))
    })
  }, [posts, selectedTags])

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
        Writing
      </h1>
      <div className="mb-8" style={{ borderBottom: '1px solid var(--border)' }} />
      <Search posts={filteredPosts} />
      <TagsFilter
        posts={posts}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />
      <BlogPosts posts={filteredPosts} />
      {selectedTags.length > 0 && (
        <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} filtered by:{' '}
          {selectedTags.join(', ')}
        </p>
      )}
    </section>
  )
}
