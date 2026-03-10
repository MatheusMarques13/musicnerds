const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0'
const API_KEY = process.env.LASTFM_API_KEY!

async function lastfmFetch<T>(params: Record<string, string>): Promise<T> {
  const url = new URL(LASTFM_BASE)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('format', 'json')
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`Last.fm error: ${res.status}`)
  return res.json()
}

export async function getTopAlbums(limit = 12) {
  const data = await lastfmFetch<any>({
    method: 'chart.getTopArtists',
    limit: String(limit),
  })
  return data?.artists?.artist ?? []
}

export async function searchAlbums(query: string, limit = 12) {
  const data = await lastfmFetch<any>({
    method: 'album.search',
    album: query,
    limit: String(limit),
  })
  return data?.results?.albummatches?.album ?? []
}

export async function getAlbumInfo(artist: string, album: string) {
  const data = await lastfmFetch<any>({
    method: 'album.getInfo',
    artist,
    album,
  })
  return data?.album ?? null
}

export async function getUserTopArtists(username: string, period: 'overall' | '7day' | '1month' | '3month' | '6month' | '12month' = '1month', limit = 5) {
  const data = await lastfmFetch<any>({
    method: 'user.getTopArtists',
    user: username,
    period,
    limit: String(limit),
  })
  return data?.topartists?.artist ?? []
}

export async function getUserTopAlbums(username: string, period = '1month', limit = 5) {
  const data = await lastfmFetch<any>({
    method: 'user.getTopAlbums',
    user: username,
    period,
    limit: String(limit),
  })
  return data?.topalbums?.album ?? []
}

export async function getUserRecentTracks(username: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: 'user.getRecentTracks',
    user: username,
    limit: String(limit),
  })
  return data?.recenttracks?.track ?? []
}

export async function getUserInfo(username: string) {
  const data = await lastfmFetch<any>({
    method: 'user.getInfo',
    user: username,
  })
  return data?.user ?? null
}
