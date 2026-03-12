import { NextRequest, NextResponse } from 'next/server'
import { getAlbumInfo } from '@/lib/lastfm'

export const runtime = 'nodejs'

async function getSpotifyToken(): Promise<string> {
  const credentials = btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })
  const data = await res.json()
  return data.access_token
}

async function searchAlbumById(spotifyId: string, token: string) {
  // Search by Spotify album ID using the search endpoint
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=album:*&type=album&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

async function getAlbumTracks(spotifyId: string, token: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/albums/${spotifyId}/tracks?limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) return null
  return res.json()
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getSpotifyToken()

    // Try to get tracks (this endpoint is usually accessible)
    const tracksData = await getAlbumTracks(params.id, token)

    // Get album metadata from the new-releases cache or search
    // We'll reconstruct from the tracks response + URL context
    const searchParams = request.nextUrl.searchParams
    const title = searchParams.get('title') ?? ''
    const artist = searchParams.get('artist') ?? ''
    const cover = searchParams.get('cover') ?? ''
    const year = searchParams.get('year') ?? ''

    let lastfmData = null
    if (artist && title) {
      try {
        lastfmData = await getAlbumInfo(artist, title)
      } catch {
        // not critical
      }
    }

    return NextResponse.json({
      id: params.id,
      title: title || 'Unknown Album',
      artist: artist || 'Unknown Artist',
      cover_url: cover || null,
      release_date: year || null,
      total_tracks: tracksData?.total ?? tracksData?.items?.length ?? 0,
      spotify_url: `https://open.spotify.com/album/${params.id}`,
      tracks: tracksData?.items?.map((t: any) => ({
        number: t.track_number,
        title: t.name,
        duration_ms: t.duration_ms,
        preview_url: t.preview_url,
      })) ?? [],
      lastfm: lastfmData ? {
        listeners: lastfmData.listeners,
        playcount: lastfmData.playcount,
        tags: lastfmData.tags?.tag?.map((t: any) => t.name) ?? [],
        wiki: lastfmData.wiki?.summary ?? null,
      } : null,
    })
  } catch (err) {
    console.error('[album] error:', String(err))
    return NextResponse.json({ error: 'Album not found', details: String(err) }, { status: 404 })
  }
}
