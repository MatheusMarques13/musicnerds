import { Header } from '@/components/layout/Header'
import { ActivityItem } from '@/components/ui/ActivityItem'

const feedItems = [
  { username: 'sophiamusic', timeAgo: '2 hours ago', action: 'rated 5 stars and wrote a review', albumTitle: 'Lost in Paradise', albumArtist: 'The Midnight', albumInitials: 'LP', rating: 5 },
  { username: 'jakebeats', timeAgo: '5 hours ago', action: 'added to list "Best Electronic of 2026"', albumTitle: 'Future Sounds', albumArtist: 'ODESZA', albumInitials: 'FS' },
  { username: 'mariavibes', timeAgo: '1 day ago', action: 'rated 4 stars', albumTitle: 'Short n\' Sweet', albumArtist: 'Sabrina Carpenter', albumInitials: 'SC', rating: 4 },
  { username: 'recordnerdd', timeAgo: '1 day ago', action: 'added to collection', albumTitle: 'folklore', albumArtist: 'Taylor Swift', albumInitials: 'FL' },
  { username: 'vinylhead', timeAgo: '2 days ago', action: 'rated 5 stars', albumTitle: 'Blonde', albumArtist: 'Frank Ocean', albumInitials: 'BL', rating: 5 },
  { username: 'tunetracker', timeAgo: '3 days ago', action: 'created a new list "My 2026 Favorites"', albumTitle: 'GNX', albumArtist: 'Kendrick Lamar', albumInitials: 'GN' },
]

export function FeedView() {
  return (
    <>
      <Header title="Activity Feed" />
      <div className="flex flex-col gap-4">
        {feedItems.map((item, i) => (
          <ActivityItem key={i} {...item} />
        ))}
      </div>
    </>
  )
}
