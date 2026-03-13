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

const CARD_PALETTE = [
  { bg: '#FFCDC4', accent: '#c0392b', text: '#3A1210', muted: 'rgba(58,18,16,0.55)' },
  { bg: '#E6F0C0', accent: '#5a8a1a', text: '#1E3206', muted: 'rgba(30,50,6,0.55)' },
  { bg: '#C4E8D0', accent: '#1a7a3a', text: '#0D2E18', muted: 'rgba(13,46,24,0.55)' },
  { bg: '#DCEEF6', accent: '#1a6a9a', text: '#0D2232', muted: 'rgba(13,34,50,0.55)' },
  { bg: '#E2D4F0', accent: '#6a2a9a', text: '#1E0E30', muted: 'rgba(30,14,48,0.55)' },
  { bg: '#F8EED8', accent: '#a06010', text: '#2E1A04', muted: 'rgba(46,26,4,0.55)' },
]

function pickPalette(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return CARD_PALETTE[Math.abs(h) % CARD_PALETTE.length]
}

export function AlbumCard({
  title,
  artist,
  rating,
  coverUrl,
  initials,
  spotifyId,
  releaseYear,
  onClick,
}: AlbumCardProps) {
  const router = useRouter()
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const palette = pickPalette(title)

  function handleClick() {
    if (onClick) { onClick(); return }
    if (spotifyId) {
      sessionStorage.setItem(
        `album_${spotifyId}`,
        JSON.stringify({ title, artist, cover_url: coverUrl ?? null, release_date: releaseYear ?? null, spotify_id: spotifyId })
      )
      router.push(`/album/${spotifyId}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: coverUrl ? 'var(--bg-card)' : palette.bg,
        border: coverUrl ? '1px solid var(--border)' : 'none',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card)')}
    >
      {coverUrl ? (
        /* ── With cover image: image top + info strip below ── */
        <>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-3" style={{ background: 'var(--bg-card)' }}>
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{title}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>
              {artist}{releaseYear ? ` · ${releaseYear}` : ''}
            </p>
            {rating > 0 && <StarRow full={fullStars} half={hasHalf} value={rating} />}
          </div>
        </>
      ) : (
        /* ── No cover: Craft-style document card ── */
        <div style={{ padding: '16px 16px 14px', minHeight: 162 }}>
          {/* Small album thumbnail */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: palette.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
              flexShrink: 0,
            }}
          >
            <span style={{ color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.04em' }}>
              {(initials ?? title.slice(0, 2)).toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: palette.text,
              lineHeight: 1.3,
              marginBottom: 5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </p>

          {/* Artist · Year */}
          <p style={{ fontSize: 11.5, color: palette.muted, marginBottom: 10 }}>
            {artist}{releaseYear ? ` · ${releaseYear}` : ''}
          </p>

          {/* Stars */}
          {rating > 0 && <StarRow full={fullStars} half={hasHalf} value={rating} warm />}
        </div>
      )}
    </div>
  )
}

function StarRow({
  full,
  half,
  value,
  warm,
}: {
  full: number
  half: boolean
  value: number
  warm?: boolean
}) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          style={{ color: 'var(--accent-warm)' }}
          fill={i < full || (i === full && half) ? 'var(--accent-warm)' : 'none'}
        />
      ))}
      <span
        className="text-[11px] font-medium ml-0.5"
        style={{ color: warm ? 'rgba(0,0,0,0.4)' : 'var(--muted)' }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  )
}
