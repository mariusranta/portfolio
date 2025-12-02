import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My World
      </h1>
      <p className="mb-4">
        {`Moro! I'm Marius, a computer science student at University of Turku.
        
        I love designing, building, and solving problems as a team.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
