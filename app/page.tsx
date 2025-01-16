import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hej, Ardha!
      </h1>
      <p className="mb-4">
        {`With a background in Marine Science and currently handling various issues in the climate
change, Ardha has cultivated a strong passion for data-driven policy analysis, particularly
in the fields of environment and economics. As a policy analyst in the Environment and
Forestry sector at the Coordinating Ministry for Maritime Aﬀairs and Investment, Ardha has
developed expertise in using data to support sustainable development and
environmental conservation strategies.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
