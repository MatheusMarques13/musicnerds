'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { StatCard } from '@/components/ui/StatCard'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { ActivityItem } from '@/components/ui/ActivityItem'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

const fallbackAlbums = [
  { title: 'The Tortured Poets Department', artist: 'Taylor Swift', rating: 4.8, initials: 'TS' },
  { title: 'Brat', artist: 'Charli XCX', rating: 4.6, initials: 'BR' },
  { title: 'GNX', artist: 'Kendrick Lamar', rating: 4.7, initials: 'KD' },
  { title: "Short n' Sweet", artist: 'Sabrina Carpenter', rating: 4.2, initials: 'SC' },
  { title: 'Hit Me Hard and Soft', artist: 'Billie Eilish', rating: 4.5, initials: 'BE' },
  { title: 'Eternal Sunshine', artist: 'Ariana Grande', rating: 4.3, initials: 'AG' },
]

const recentActivity = [
  { username: 'sophiamusic', timeAgo: '2 hours ago', action: 'rated 5 stars and wrote a review', albumTitle: 'Lost in Paradise', albumArtist: 'The Midnight', albumInitials: 'LP', rating: 5 },
  { username: 'jakebeats', timeAgo: '5 hours ago', action: 'added to list "Best Electronic of 2026"', albumTitle: 'Future Sounds', albumArtist: 'ODESZA', albumInitials: 'FS' },
  { username: 'mariavibes', timeAgo: '1 day ago', action: 'rated 4 stars', albumTitle: "Short n' Sweet", albumArtist: 'Sabrina Carpenter', albumInitials: 'SC', rating: 4 },
]

export function HomeView() {
  const [newReleases, setNewReleases] = useState<any[]>([])
  const [loadingReleases, setLoadingReleases] = useState(true)
  const [stats, setStats] = useState({ scrobbles: 0, rated: 0, artists: 0, lists: 0 })
  const supabase = createClient()

  useEffect(() => {
    // Fetch real new releases from Spotify
    fetch('/api/albums/new-releases')
      .then((r) => r.json())
      .then((data) => {
        if (data.albums?.length) setNewReleases(data.albums.slice(0, 6))
      })
      .catch(() => {})
      .finally(() => setLoadingReleases(false))

    // Fetch real user stats from Supabase
    async function loadStats() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ count: rated }, { count: lists }] = await Promise.all([
        supabase.from('ratings').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('lists').select('*', { count: 'exact', head: true }).eq('creator_id', user.id),
      ])

      const { data: profile } = await supabase.from('profiles').select('total_scrobbles').eq('id', user.id).single()

      setStats({
        scrobbles: profile?.total_scrobbles ?? 0,
        rated: rated ?? 0,
        artists: 0,
        lists: lists ?? 0,
      })
    }
    loadStats()
  }, [])

  const displayAlbums = newReleases.length > 0 ? newReleases : fallbackAlbums

  return (
    <>
      <Header title="Welcome back" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Scrobbles" value={stats.scrobbles.toLocaleString()} />
        <StatCard label="Albums Rated" value={stats.rated.toLocaleString()} />
        <StatCard label="Artists Followed" value={stats.artists.toLocaleString()} />
        <StatCard label="Lists Created" value={stats.lists.toLocaleString()} />
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          {newReleases.length > 0 ? '🆕 New Releases' : '🔥 Currently Trending'}
        </h2>
        {loadingReleases && <Loader2 size={16} className="animate-spin text-teal-500" />}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-8">
        {displayAlbums.map((album: any) => (
          <AlbumCard
            key={album.title}
            title={album.title}
            artist={album.artist}
            rating={album.rating ?? 0}
            coverUrl={album.cover_url ?? undefined}
            initials={album.initials ?? album.title?.slice(0, 2).toUpperCase()}
          />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-5">Recent Activity</h2>
      <div className="flex flex-col gap-4">
        {recentActivity.map((item) => (
          <ActivityItem key={item.username + item.albumTitle} {...item} />
        ))}
      </div>
    </>
  )
}
