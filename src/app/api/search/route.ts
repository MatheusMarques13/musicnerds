import { NextRequest, NextResponse } from 'next/server'
import { searchAlbums } from '@/lib/lastfm'
import { searchSpotifyAlbum } from '@/lib/spotify'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  try {
    const [spotifyResult, lastfmResult] = await Promise.allSettled([
      searchSpotifyAlbum(query, 12),
      searchAlbums(query, 12),
    ])

    const spotify = spotifyResult.status === 'fulfilled' ? spotifyResult.value : []
    const lastfm = lastfmResult.status === 'fulfilled' ? lastfmResult.value : []

    // If Spotify worked, use it as primary source
    if (spotify.length > 0) {
      const merged = spotify.map((spItem: any) => ({
        id: spItem.id,
        title: spItem.name,
        artist: spItem.artists?.[0]?.name ?? 'Unknown',
        cover_url: spItem.images?.[1]?.url ?? spItem.images?.[0]?.url ?? null,
        release_year: spItem.release_date?.split('-')[0] ?? '',
        spotify_id: spItem.id,
        total_tracks: spItem.total_tracks,
      }))
      return NextResponse.json({ results: merged, total: merged.length, source: 'spotify' })
    }

    // Fallback to Last.fm if Spotify failed
    if (lastfm.length > 0) {
      const merged = lastfm.map((lf: any) => ({
        id: lf.mbid || `${lf.name}-${lf.artist}`,
        title: lf.name,
        artist: lf.artist ?? 'Unknown',
        cover_url: lf.image?.find((i: any) => i.size === 'extralarge')?.['#text'] || null,
        release_year: '',
        spotify_id: null,
        total_tracks: null,
      }))
      return NextResponse.json({ results: merged, total: merged.length, source: 'lastfm' })
    }

    return NextResponse.json({ results: [], total: 0, source: 'none' })
  } catch (err) {
    console.error('[search] error:', err)
    return NextResponse.json({ error: 'Search failed', details: String(err) }, { status: 500 })
  }
}
