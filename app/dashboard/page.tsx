import LeafletMapClient from "./LeafletMapClient";

type Weather = {
  location: { name: string; region: string; localtime: string }
  current: { temp_c: number; feelslike_c: number; condition: { text: string; icon: string } }
}

async function getWeather(city: string): Promise<Weather | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  try {
    const res = await fetch(`${base}/api/weather?q=${encodeURIComponent(city)}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Weather fetch failed', error)
    return null
  }
}

const WORLDNEWS_API = 'https://api.worldnewsapi.com/search-news';

async function getNews(city: string) {
  const apiKey = process.env.WORLDNEWS_API_KEY;
  if (!apiKey) throw new Error('WORLDNEWS_API_KEY not set');

  const url = `${WORLDNEWS_API}?${new URLSearchParams({
    'api-key': apiKey,
    text: city,           // search term
    language: 'fi',
    number: '3',          // limit results
  }).toString()}`;

  const res = await fetch(url, {
    // cache on the server; adjust as needed
    next: { revalidate: 60 * 30 },
  });
  if (!res.ok) throw new Error(`WorldNewsAPI failed: ${res.status}`);
  const data = await res.json();
  return data.news; // array of articles
}

async function getGitHubStats() {
  // e.g., GitHub REST via PAT stored in env; use cache: 'no-store' or ISR
  return { stars: 0, repos: 0 } // placeholder
}

export default async function DashboardPage() {
  const news = await getNews('Turku');
  const city = 'Turku'
  const [weather] = await Promise.all([
    getWeather(city)
  ])

  if (!weather) {
    return (
      <main className="space-y-6">
        <section className="rounded border p-4">Weather data unavailable right now.</section>
      </main>
    )
  }

  return (
    <main className="space-y-6">
      <section className="rounded border p-4 flex items-center gap-4">
        <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} width={48} height={48} />
        <div>
          <div className="text-lg font-medium">
            {weather.location.name}, {weather.location.region}
          </div>
          <div>{weather.current.condition.text}</div>
          <div>{weather.current.temp_c} °C (feels {weather.current.feelslike_c} °C)</div>
          <div className="text-sm text-neutral-500">Local time: {weather.location.localtime}</div>
        </div>
      </section>
      <section className="border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-2">Kartta</h2>
        <div className="w-full h-[350px]">
          <LeafletMapClient />
        </div>
      </section>
    </main>
  )
}

// TODO: https://github.com/AttLii/neksti-tv

// roskiin
/*
      <section className="rounded border p-4">
        <div>
          {news.map((article: any) => (
            <article key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noreferrer">Read</a>
            </article>
          ))}
        </div>
      </section>
      */