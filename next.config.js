/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure MDX blog content is traced into the build output for static routes.
  outputFileTracingIncludes: {
    '/blog/[slug]': ['./app/blog/posts/**/*'],
    '/blog': ['./app/blog/posts/**/*'],
    '/rss': ['./app/blog/posts/**/*'],
    '/sitemap.xml': ['./app/blog/posts/**/*'],
  },
}

module.exports = nextConfig
