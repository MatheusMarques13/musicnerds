'use client'

import { useSearch } from '@/hooks/useSearch'
import { AlbumSearchResult } from './AlbumSearchResult'
import { Search, Loader2, X } from 'lucide-react'

export function SearchBar() {
  const { query, setQuery, results, loading } = useSearch()

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search albums or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-xl bg-cream-100 dark:bg-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {loading && (
          <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 animate-spin" />
        )}
        {query && !loading && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-cream-100 dark:bg-charcoal-800 border border-brown-600/20 dark:border-gray-400/30 rounded-xl shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
          {results.map((album) => (
            <AlbumSearchResult
              key={album.id}
              album={album}
              onClick={() => setQuery('')}
            />
          ))}
        </div>
      )}
    </div>
  )
}
