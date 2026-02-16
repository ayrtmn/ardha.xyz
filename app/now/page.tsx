import fs from 'fs'
import path from 'path'
import { CustomMDX } from 'app/components/mdx'
import matter from 'gray-matter'

export const metadata = {
  title: 'Now',
  description: 'What I am currently focused on.',
}

export default function NowPage() {
  const nowPath = path.join(process.cwd(), 'content', 'now.mdx')
  const fileContent = fs.readFileSync(nowPath, 'utf-8')
  const { content } = matter(fileContent)

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
        Now
      </h1>
      <div className="mb-8" style={{ borderBottom: '1px solid var(--border)' }} />
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  )
}
