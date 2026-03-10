'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

interface AlbumCardProps {
  title: string
  artist: string
  rating: number
  coverUrl?: string
  initials?: string
  onClick?: () => void
}

export function AlbumCard({ title, artist, rating, coverUrl, initials, onClick }: AlbumCardProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <div
      onClick={onClick}
      className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="w-full aspect-square bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-3xl font-bold">
        {coverUrl ? (
          <Image src={coverUrl} alt={title} fill className="object-cover" />
        ) : (
          <span>{initials ?? title.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="p-3">
        <div className="font-semibold text-sm truncate mb-1">{title}</div>
        <div className="text-xs text-slate-500 dark:text-gray-300/70 mb-2">{artist}</div>
        <div className="flex items-center gap-1">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < fullStars || (i === fullStars && hasHalf) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
