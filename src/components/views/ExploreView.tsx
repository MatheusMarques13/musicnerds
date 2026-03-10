'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { useSearch } from '@/hooks/useSearch'
import { useNewReleases } from '@/hooks/useNewReleases'
import { Search, Loader2 } from 'lucide-react'

const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Indie', 'Metal']

export function ExploreView() {
  const [activeGenre, setActiveGenre] = useState('All')
  const { query, setQuery, results, loading: searchLoading } = useSearch()
  const { albums: newReleases, loading: releasesLoading } = useNewReleases()

  const isSearching = query.trim().length >= 2

  // When searching, show search results; otherwise show new releases filtered by genre
  const displayAlbums = isSearching
    ? results
    : activeGenre === 'All'
    ? newReleases
    : newReleases // genre filter will work once we have real genre data

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
          className="w-full pl-10 pr-12 py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-xl bg-cream-100 dark:bg-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {searchLoading && (
          <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 animate-spin" />
        )}
      </div>

      {!isSearching && (
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
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide">
          {isSearching
            ? `${results.length} results for "${query}"`
            : releasesLoading
            ? 'Loading new releases...'
            : `${newReleases.length} new releases`}
        </h2>
        {releasesLoading && !isSearching && (
          <Loader2 size={16} className="animate-spin text-teal-500" />
        )}
      </div>

      {displayAlbums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {displayAlbums.map((album: any) => (
            <AlbumCard
              key={album.id ?? album.title}
              title={album.title}
              artist={album.artist}
              rating={album.avg_rating ?? 0}
              coverUrl={album.cover_url ?? undefined}
              initials={album.title?.slice(0, 2).toUpperCase()}
            />
          ))}
        </div>
      ) : !releasesLoading && !searchLoading ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-4">🎵</p>
          <p>{isSearching ? `No results for "${query}"` : 'No albums found'}</p>
        </div>
      ) : null}
    </>
  )
}
