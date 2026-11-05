import Link from "next/link"

const links = [
  { href: "/blog", label: "Writing", note: "Notes and ideas from along the way." },
  { href: "/dashboard", label: "Dashboard", note: "A small corner for useful experiments." },
  { href: "https://github.com/mariusranta", label: "GitHub", note: "Code, projects, and things I'm learning." },
]

const waysOfWorking = [
  { label: "Design", text: "I enjoy shaping ideas into clear, useful experiences." },
  { label: "Build", text: "I like making things real and figuring out the details as I go." },
  { label: "Together", text: "The best problems are the ones we solve as a team." },
]

export default function Page() {
  return (
    <div className="space-y-11 pb-4">
      <section className="space-y-5 pt-1">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          Personal website
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Marius Ranta
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-neutral-700 dark:text-neutral-200">
          Moro! I&apos;m a computer science student at the University of Turku. I love designing, building, and solving problems as a team.
        </p>
      </section>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      <section className="grid gap-5 sm:grid-cols-[145px_minmax(0,1fr)] sm:gap-8">
        <h2 className="pt-1 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          How I like to work
        </h2>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {waysOfWorking.map((item) => (
            <div key={item.label} className="grid gap-1 py-3 first:pt-0 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-4">
              <h3 className="text-sm font-medium">{item.label}</h3>
              <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      <section className="grid gap-5 sm:grid-cols-[145px_minmax(0,1fr)] sm:gap-8">
        <h2 className="pt-1 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          Explore
        </h2>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {links.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <Link
                href={item.href}
                className="w-fit text-sm font-medium underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-500 dark:decoration-neutral-700 dark:hover:text-neutral-300"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.label} ↗
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
