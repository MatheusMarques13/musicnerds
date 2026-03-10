import { NextRequest, NextResponse } from 'next/server'
import { getSpotifyAlbum } from '@/lib/spotify'
import { getAlbumInfo } from '@/lib/lastfm'

export const runtime = 'nodejs'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const spotifyAlbum = await getSpotifyAlbum(params.id)

    if (!spotifyAlbum || spotifyAlbum.error) {
      console.error('[album] Spotify returned error:', spotifyAlbum)
      return NextResponse.json({ error: 'Album not found on Spotify' }, { status: 404 })
    }

    const artist = spotifyAlbum?.artists?.[0]?.name
    const title = spotifyAlbum?.name

    let lastfmData = null
    if (artist && title) {
      try {
        lastfmData = await getAlbumInfo(artist, title)
      } catch {
        // Last.fm not critical, continue without it
      }
    }

    return NextResponse.json({
      id: spotifyAlbum.id,
      title: spotifyAlbum.name,
      artist,
      cover_url: spotifyAlbum.images?.[0]?.url ?? null,
      release_date: spotifyAlbum.release_date,
      total_tracks: spotifyAlbum.total_tracks,
      spotify_url: spotifyAlbum.external_urls?.spotify,
      tracks: spotifyAlbum.tracks?.items?.map((t: any) => ({
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
