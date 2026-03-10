export interface User {
  id: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  created_at: string
}

export interface Album {
  id: string
  title: string
  artist: string
  cover_url?: string
  release_year?: number
  genre?: string
  spotify_id?: string
  lastfm_mbid?: string
  avg_rating?: number
  total_ratings?: number
}

export interface Rating {
  id: string
  user_id: string
  album_id: string
  rating: number // 0.5 to 5.0
  review?: string
  created_at: string
  updated_at: string
}

export interface Scrobble {
  id: string
  user_id: string
  track_name: string
  artist: string
  album?: string
  scrobbled_at: string
}

export interface MusicList {
  id: string
  title: string
  description?: string
  creator_id: string
  is_collaborative: boolean
  albums: Album[]
  created_at: string
}

export interface Community {
  id: string
  name: string
  description: string
  genre?: string
  member_count: number
  cover_url?: string
}
