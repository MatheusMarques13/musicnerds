'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { Search } from 'lucide-react'

const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Indie', 'Metal']

const allAlbums = [
  { title: 'Midnights', artist: 'Taylor Swift', rating: 4.5, initials: 'MD', genre: 'Pop' },
  { title: 'Renaissance', artist: 'Beyoncé', rating: 4.7, initials: 'RN', genre: 'R&B' },
  { title: 'Un Verano Sin Ti', artist: 'Bad Bunny', rating: 4.6, initials: 'UV', genre: 'Pop' },
  { title: 'Mr. Morale', artist: 'Kendrick Lamar', rating: 4.8, initials: 'MM', genre: 'Hip-Hop' },
  { title: 'Chromatica', artist: 'Lady Gaga', rating: 4.0, initials: 'CR', genre: 'Electronic' },
  { title: 'folklore', artist: 'Taylor Swift', rating: 4.9, initials: 'FL', genre: 'Indie' },
  { title: 'Blonde', artist: 'Frank Ocean', rating: 5.0, initials: 'BL', genre: 'R&B' },
  { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', rating: 5.0, initials: 'TP', genre: 'Hip-Hop' },
  { title: 'Random Access Memories', artist: 'Daft Punk', rating: 4.8, initials: 'RA', genre: 'Electronic' },
  { title: 'In Rainbows', artist: 'Radiohead', rating: 4.9, initials: 'IR', genre: 'Rock' },
  { title: 'Kind of Blue', artist: 'Miles Davis', rating: 5.0, initials: 'KB', genre: 'Jazz' },
  { title: 'Nevermind', artist: 'Nirvana', rating: 4.7, initials: 'NV', genre: 'Rock' },
]

export function ExploreView() {
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')

  const filtered = allAlbums.filter((a) => {
    const matchesGenre = activeGenre === 'All' || a.genre === activeGenre
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.artist.toLowerCase().includes(query.toLowerCase())
    return matchesGenre && matchesQuery
  })

  return (
    <>
      <Header title="Explore" />

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search albums or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-lg bg-cream-100 dark:bg-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGenre(g)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeGenre === g
                ? 'bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900'
                : 'bg-brown-600/12 dark:bg-gray-400/15 hover:bg-brown-600/20 dark:hover:bg-gray-400/25'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {filtered.map((album) => (
          <AlbumCard key={album.title} {...album} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-4">🎵</p>
          <p>No albums found for "{query}"</p>
        </div>
      )}
    </>
  )
}
