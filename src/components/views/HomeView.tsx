'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { StatCard } from '@/components/ui/StatCard'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { ActivityItem } from '@/components/ui/ActivityItem'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

const fallbackAlbums = [
  { id: '5H7ixXZfsNMGbIE5OBSpcb', title: 'The Tortured Poets Department', artist: 'Taylor Swift', rating: 4.8, spotify_id: '5H7ixXZfsNMGbIE5OBSpcb', release_year: '2024' },
  { id: '2lIZef4lzdvZkiiCzvPwXK', title: 'Brat', artist: 'Charli XCX', rating: 4.6, spotify_id: '2lIZef4lzdvZkiiCzvPwXK', release_year: '2024' },
  { id: '6PBZN8cbwkqm1ERj2BGXJ1', title: 'GNX', artist: 'Kendrick Lamar', rating: 4.7, spotify_id: '6PBZN8cbwkqm1ERj2BGXJ1', release_year: '2024' },
  { id: '5S5GQZjt2n3xJbpE0TcZGy', title: "Short n' Sweet", artist: 'Sabrina Carpenter', rating: 4.2, spotify_id: '5S5GQZjt2n3xJbpE0TcZGy', release_year: '2024' },
  { id: '7aJuWoE5s5MLdKe5xyaFSF', title: 'Hit Me Hard and Soft', artist: 'Billie Eilish', rating: 4.5, spotify_id: '7aJuWoE5s5MLdKe5xyaFSF', release_year: '2024' },
  { id: '5vHDFbS2Y0MNIhFGaqnYEq', title: 'Eternal Sunshine', artist: 'Ariana Grande', rating: 4.3, spotify_id: '5vHDFbS2Y0MNIhFGaqnYEq', release_year: '2024' },
]

const recentActivity = [
  { username: 'sophiamusic', timeAgo: '2 hours ago', action: 'rated 5 stars', albumTitle: 'Lost in Paradise', albumArtist: 'The Midnight', albumInitials: 'LP', rating: 5 },
  { username: 'jakebeats', timeAgo: '5 hours ago', action: 'added to list', albumTitle: 'Future Sounds', albumArtist: 'ODESZA', albumInitials: 'FS' },
]

export function HomeView() {
  const [newReleases, setNewReleases] = useState<any[]>([])
  const [loadingReleases, setLoadingReleases] = useState(true)
  const [stats, setStats] = useState({ scrobbles: 0, rated: 0, artists: 0, lists: 0 })
  const supabase = createClient()

  useEffect(() => {
    fetch('/api/albums/new-releases')
      .then((r) => r.json())
      .then((data) => { if (data.albums?.length) setNewReleases(data.albums.slice(0, 6)) })
      .catch(() => {})
      .finally(() => setLoadingReleases(false))

    async function loadStats() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const [{ count: rated }, { count: lists }] = await Promise.all([
        supabase.from('ratings').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('lists').select('*', { count: 'exact', head: true }).eq('creator_id', user.id),
      ])
      const { data: profile } = await supabase.from('profiles').select('total_scrobbles').eq('id', user.id).single()
      setStats({ scrobbles: profile?.total_scrobbles ?? 0, rated: rated ?? 0, artists: 0, lists: lists ?? 0 })
    }
    loadStats()
  }, [])

  const displayAlbums = newReleases.length > 0 ? newReleases : fallbackAlbums

  return (
    <>
      <Header title="Welcome back" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Scrobbles"    value={stats.scrobbles.toLocaleString()} />
        <StatCard label="Albums Rated" value={stats.rated.toLocaleString()} />
        <StatCard label="Artists"      value={stats.artists.toLocaleString()} />
        <StatCard label="Lists"        value={stats.lists.toLocaleString()} />
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--text)' }}>
          {newReleases.length > 0 ? 'New Releases' : 'Trending Now'}
        </h2>
        {loadingReleases && <Loader2 size={15} className="animate-spin" style={{ color: 'var(--accent)' }} />}
      </div>

      {/* Album grid — 3 cols on md so document cards have breathing room */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-10">
        {displayAlbums.map((album: any) => (
          <AlbumCard
            key={album.id ?? album.title}
            title={album.title}
            artist={album.artist}
            rating={album.rating ?? 0}
            coverUrl={album.cover_url ?? undefined}
            initials={album.title?.slice(0, 2).toUpperCase()}
            spotifyId={album.spotify_id ?? album.id}
            releaseYear={album.release_year ?? album.release_date?.split('-')[0]}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="font-serif text-xl font-bold mb-5" style={{ color: 'var(--text)' }}>
        Recent Activity
      </h2>
      <div className="flex flex-col gap-3">
        {recentActivity.map((item) => (
          <ActivityItem key={item.username + item.albumTitle} {...item} />
        ))}
      </div>
    </>
  )
}
