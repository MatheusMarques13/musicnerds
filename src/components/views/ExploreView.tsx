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
  const { albums: newReleases, loading: releasesLoading }    = useNewReleases()

  const isSearching   = query.trim().length >= 2
  const displayAlbums = isSearching ? results : newReleases

  return (
    <>
      <Header title="Explore" />

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Search
          size={15}
          style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--muted)', pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search albums or artists…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%', paddingLeft: 40, paddingRight: 44,
            paddingTop: 12, paddingBottom: 12,
            border: '1.5px solid var(--border)', borderRadius: 14,
            background: 'var(--bg-card)', color: 'var(--text)', fontSize: 14,
            outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
        />
        {searchLoading && (
          <Loader2
            size={15}
            className="animate-spin"
            style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--accent)',
            }}
          />
        )}
      </div>

      {/* Genre pills */}
      {!isSearching && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className="whitespace-nowrap transition-all"
              style={{
                padding: '7px 16px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeGenre === g ? 'var(--accent)' : 'rgba(33,128,141,0.09)',
                color: activeGenre === g ? 'white' : 'var(--muted)',
              }}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="flex items-center justify-between mb-5">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: 'var(--muted)' }}
        >
          {isSearching
            ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : releasesLoading
            ? 'Loading…'
            : `${newReleases.length} new releases`}
        </p>
        {releasesLoading && !isSearching && (
          <Loader2 size={15} className="animate-spin" style={{ color: 'var(--accent)' }} />
        )}
      </div>

      {/* Album grid */}
      {displayAlbums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayAlbums.map((album: any) => (
            <AlbumCard
              key={album.id ?? album.title}
              title={album.title}
              artist={album.artist}
              rating={album.avg_rating ?? 0}
              coverUrl={album.cover_url ?? undefined}
              initials={album.title?.slice(0, 2).toUpperCase()}
              spotifyId={album.spotify_id ?? album.id}
              releaseYear={album.release_year ?? album.release_date?.split('-')[0]}
            />
          ))}
        </div>
      ) : !releasesLoading && !searchLoading ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl mb-3" style={{ color: 'var(--text)' }}>
            {isSearching ? `No results for "${query}"` : 'No albums found'}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {isSearching ? 'Try a different search term.' : 'Check back soon for new releases.'}
          </p>
        </div>
      ) : null}
    </>
  )
}
