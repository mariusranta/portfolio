import { NextResponse } from 'next/server'

const WORLDNEWS_API = 'https://api.worldnewsapi.com/search-news';
const API_URL = 'https://api.weatherapi.com/v1/current.json'

export async function GET(req: Request) {
  const key = process.env.WEATHER_API_KEY
  if (!key) return NextResponse.json({ error: 'Missing WEATHER_API_KEY' }, { status: 500 })

  const city = new URL(req.url).searchParams.get('q') ?? 'Helsinki'
  const url = `${API_URL}?key=${key}&q=${encodeURIComponent(city)}&aqi=no`

  const res = await fetch(url, { cache: 'no-store' }) // or next:{ revalidate:600 } for ISR
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status })

  return NextResponse.json(await res.json())
}
