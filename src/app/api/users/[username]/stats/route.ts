import { NextRequest, NextResponse } from 'next/server'
import { getUserInfo, getUserTopArtists, getUserTopAlbums, getUserRecentTracks } from '@/lib/lastfm'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const period = (request.nextUrl.searchParams.get('period') ?? '1month') as any

  try {
    const [userInfo, topArtists, topAlbums, recentTracks] = await Promise.allSettled([
      getUserInfo(params.username),
      getUserTopArtists(params.username, period, 5),
      getUserTopAlbums(params.username, period, 5),
      getUserRecentTracks(params.username, 10),
    ])

    return NextResponse.json({
      user: userInfo.status === 'fulfilled' ? userInfo.value : null,
      topArtists: topArtists.status === 'fulfilled' ? topArtists.value : [],
      topAlbums: topAlbums.status === 'fulfilled' ? topAlbums.value : [],
      recentTracks: recentTracks.status === 'fulfilled' ? recentTracks.value : [],
    })
  } catch (err) {
    console.error('[user stats] error:', err)
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
  }
}
