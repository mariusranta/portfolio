import LeafletMapClient from "./LeafletMapClient";

export const dynamic = 'force-dynamic' // always fetch fresh data on each request

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

export default async function DashboardPage() {
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
      <>
      <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Doomsday Dashboard
      </h1>
      </section>
      <h2 className="text-lg font-medium mb-2">Weather</h2>
      <section className="rounded-xl border p-4 flex items-center gap-4">
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
      <h2 className="text-lg font-medium mb-2">Map</h2>
      <section className="border rounded-xl shadow-sm">
        <div className="w-full h-[350px] rounded-xl overflow-hidden">
          <LeafletMapClient />
        </div>
      </section>
      </>
  )
}

// TODO: https://github.com/AttLii/neksti-tv
