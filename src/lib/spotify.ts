const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_BASE = 'https://api.spotify.com/v1'

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 60000,
  }

  return cachedToken.token
}

async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken()
  const res = await fetch(`${SPOTIFY_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Spotify error: ${res.status}`)
  return res.json()
}

export async function searchSpotifyAlbum(query: string, limit = 6) {
  const encoded = encodeURIComponent(query)
  const data = await spotifyFetch<any>(`/search?q=${encoded}&type=album&limit=${limit}`)
  return data?.albums?.items ?? []
}

export async function getSpotifyAlbum(albumId: string) {
  return spotifyFetch<any>(`/albums/${albumId}`)
}

export async function getSpotifyArtist(artistId: string) {
  return spotifyFetch<any>(`/artists/${artistId}`)
}

export async function getNewReleases(limit = 12) {
  const data = await spotifyFetch<any>(`/browse/new-releases?limit=${limit}`)
  return data?.albums?.items ?? []
}

export async function getFeaturedPlaylists(limit = 6) {
  const data = await spotifyFetch<any>(`/browse/featured-playlists?limit=${limit}`)
  return data?.playlists?.items ?? []
}

export function getAlbumCover(album: any, size: 'sm' | 'md' | 'lg' = 'md'): string | null {
  const images = album?.images ?? []
  if (!images.length) return null
  if (size === 'sm') return images[2]?.url ?? images[0]?.url
  if (size === 'md') return images[1]?.url ?? images[0]?.url
  return images[0]?.url
}
