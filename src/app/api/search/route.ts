import { NextRequest, NextResponse } from 'next/server'
import { searchAlbums } from '@/lib/lastfm'
import { searchSpotifyAlbum } from '@/lib/spotify'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  try {
    const [lastfmResults, spotifyResults] = await Promise.allSettled([
      searchAlbums(query, 12),
      searchSpotifyAlbum(query, 12),
    ])

    const lastfm = lastfmResults.status === 'fulfilled' ? lastfmResults.value : []
    const spotify = spotifyResults.status === 'fulfilled' ? spotifyResults.value : []

    // Merge: prefer Spotify for cover art, Last.fm for metadata
    const merged = spotify.map((spItem: any) => {
      const lfMatch = lastfm.find((lf: any) =>
        lf.name?.toLowerCase() === spItem.name?.toLowerCase() &&
        lf.artist?.toLowerCase() === spItem.artists?.[0]?.name?.toLowerCase()
      )
      return {
        id: spItem.id,
        title: spItem.name,
        artist: spItem.artists?.[0]?.name ?? 'Unknown',
        cover_url: spItem.images?.[1]?.url ?? spItem.images?.[0]?.url ?? null,
        release_year: spItem.release_date?.split('-')[0],
        spotify_id: spItem.id,
        lastfm_url: lfMatch?.url ?? null,
        total_tracks: spItem.total_tracks,
      }
    })

    return NextResponse.json({ results: merged, total: merged.length })
  } catch (err) {
    console.error('[search] error:', err)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
