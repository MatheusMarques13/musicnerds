import { Header } from '@/components/layout/Header'
import { StatCard } from '@/components/ui/StatCard'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { ActivityItem } from '@/components/ui/ActivityItem'

const trendingAlbums = [
  { title: 'The Tortured Poets Department', artist: 'Taylor Swift', rating: 4.8, initials: 'TS' },
  { title: 'Brat', artist: 'Charli XCX', rating: 4.6, initials: 'BE' },
  { title: 'GNX', artist: 'Kendrick Lamar', rating: 4.7, initials: 'KD' },
  { title: 'Short n\' Sweet', artist: 'Sabrina Carpenter', rating: 4.2, initials: 'SC' },
  { title: 'Hit Me Hard and Soft', artist: 'Billie Eilish', rating: 4.5, initials: 'BE' },
  { title: 'Eternal Sunshine', artist: 'Ariana Grande', rating: 4.3, initials: 'AG' },
]

const recentActivity = [
  {
    username: 'sophiamusic',
    timeAgo: '2 hours ago',
    action: 'rated 5 stars and wrote a review',
    albumTitle: 'Lost in Paradise',
    albumArtist: 'The Midnight',
    albumInitials: 'LP',
    rating: 5,
  },
  {
    username: 'jakebeats',
    timeAgo: '5 hours ago',
    action: 'added to list "Best Electronic of 2026"',
    albumTitle: 'Future Sounds',
    albumArtist: 'ODESZA',
    albumInitials: 'FS',
  },
  {
    username: 'mariavibes',
    timeAgo: '1 day ago',
    action: 'started following',
    albumTitle: 'Phoebe Bridgers',
    albumArtist: 'Artist • 2.4M followers',
    albumInitials: 'PH',
  },
]

export function HomeView() {
  return (
    <>
      <Header title="Welcome back, Mathmarques" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Scrobbles" value="12,847" />
        <StatCard label="Albums Rated" value="326" />
        <StatCard label="Artists Followed" value="89" />
        <StatCard label="Lists Created" value="14" />
      </div>

      <h2 className="text-xl font-bold mb-5">Currently Trending</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-8">
        {trendingAlbums.map((album) => (
          <AlbumCard key={album.title} {...album} />
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
