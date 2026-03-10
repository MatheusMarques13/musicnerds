import { NextResponse } from 'next/server'
import { getNewReleases } from '@/lib/spotify'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const albums = await getNewReleases(12)
    const formatted = albums.map((a: any) => ({
      id: a.id,
      title: a.name,
      artist: a.artists?.[0]?.name ?? 'Unknown',
      cover_url: a.images?.[1]?.url ?? a.images?.[0]?.url ?? null,
      release_year: a.release_date?.split('-')[0],
      spotify_id: a.id,
      total_tracks: a.total_tracks,
    }))
    return NextResponse.json({ albums: formatted })
  } catch (err) {
    console.error('[new-releases] error:', err)
    return NextResponse.json({ albums: [], error: String(err) })
  }
}
