'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'

interface AlbumCardProps {
  title: string
  artist: string
  rating: number
  coverUrl?: string
  initials?: string
  spotifyId?: string
  releaseYear?: string
  onClick?: () => void
}

export function AlbumCard({ title, artist, rating, coverUrl, initials, spotifyId, releaseYear, onClick }: AlbumCardProps) {
  const router = useRouter()
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  function handleClick() {
    if (onClick) { onClick(); return }
    if (spotifyId) {
      sessionStorage.setItem(`album_${spotifyId}`, JSON.stringify({
        title, artist,
        cover_url: coverUrl ?? null,
        release_date: releaseYear ?? null,
        spotify_id: spotifyId,
      }))
      router.push(`/album/${spotifyId}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card)')}
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-square overflow-hidden"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif text-white text-3xl font-bold">
            {initials ?? title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{title}</p>
        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>{artist}</p>
        {rating > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                style={{ color: 'var(--accent-warm)' }}
                fill={i < fullStars || (i === fullStars && hasHalf) ? 'var(--accent-warm)' : 'none'}
              />
            ))}
            <span className="text-[11px] font-medium ml-0.5" style={{ color: 'var(--muted)' }}>
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
