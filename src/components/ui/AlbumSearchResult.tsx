'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { SearchResult } from '@/hooks/useSearch'

interface AlbumSearchResultProps {
  album: SearchResult
  onClick?: (album: SearchResult) => void
}

export function AlbumSearchResult({ album, onClick }: AlbumSearchResultProps) {
  return (
    <div
      onClick={() => onClick?.(album)}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-brown-600/8 dark:hover:bg-gray-400/10 cursor-pointer transition-colors"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-teal-500 to-teal-700">
        {album.cover_url ? (
          <Image
            src={album.cover_url}
            alt={album.title}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
            {album.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{album.title}</div>
        <div className="text-xs text-slate-500 dark:text-gray-300/70">
          {album.artist} {album.release_year && `· ${album.release_year}`}
        </div>
      </div>
      <Star size={14} className="text-slate-300 dark:text-gray-500 shrink-0" />
    </div>
  )
}
