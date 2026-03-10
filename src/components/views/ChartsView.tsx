import { Header } from '@/components/layout/Header'
import { AlbumCard } from '@/components/ui/AlbumCard'

const topAlbums = [
  { title: 'Blonde', artist: 'Frank Ocean', rating: 5.0, initials: 'BL' },
  { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', rating: 5.0, initials: 'TP' },
  { title: 'Kind of Blue', artist: 'Miles Davis', rating: 5.0, initials: 'KB' },
  { title: 'folklore', artist: 'Taylor Swift', rating: 4.9, initials: 'FL' },
  { title: 'In Rainbows', artist: 'Radiohead', rating: 4.9, initials: 'IR' },
  { title: 'GNX', artist: 'Kendrick Lamar', rating: 4.8, initials: 'GN' },
  { title: 'Random Access Memories', artist: 'Daft Punk', rating: 4.8, initials: 'RA' },
  { title: 'Mr. Morale', artist: 'Kendrick Lamar', rating: 4.8, initials: 'MM' },
  { title: 'The Tortured Poets Department', artist: 'Taylor Swift', rating: 4.8, initials: 'TS' },
  { title: 'Renaissance', artist: 'Beyoncé', rating: 4.7, initials: 'RN' },
  { title: 'Nevermind', artist: 'Nirvana', rating: 4.7, initials: 'NV' },
  { title: 'Brat', artist: 'Charli XCX', rating: 4.6, initials: 'BR' },
]

export function ChartsView() {
  return (
    <>
      <Header title="Charts" />

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">🏆 Top Rated of All Time</h2>
        <p className="text-sm text-slate-500 dark:text-gray-300/70">Based on community ratings</p>
      </div>

      <div className="flex flex-col gap-3">
        {topAlbums.map((album, index) => (
          <div
            key={album.title}
            className="flex items-center gap-4 bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl font-bold text-slate-300 dark:text-gray-500 w-8 text-center">
              {index + 1}
            </span>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {album.initials}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{album.title}</div>
              <div className="text-sm text-slate-500 dark:text-gray-300/70">{album.artist}</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-bold">{album.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
