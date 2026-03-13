'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/Header'
import { Star, Loader2 } from 'lucide-react'

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          style={{ color: 'var(--accent-warm)' }}
          fill={i < full || (i === full && half) ? 'var(--accent-warm)' : 'none'}
        />
      ))}
    </div>
  )
}

export function RatingsView() {
  const [ratings, setRatings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data, error } = await supabase
        .from('ratings')
        .select('rating, review, updated_at, albums(title, artist, cover_url, spotify_id)')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) console.error('[ratings]', error)
      setRatings(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <Header title="Your Ratings" />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
        </div>
      ) : ratings.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-2xl mb-3" style={{ color: 'var(--text)' }}>No ratings yet</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Open any album page and tap the stars to rate it.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {ratings.map((r: any, i) => {
            const album = r.albums
            const spotifyId = album?.spotify_id
            return (
              <div
                key={i}
                className="rounded-2xl border p-4 flex gap-4 cursor-pointer transition-all"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card)')}
                onClick={() => spotifyId && router.push(`/album/${spotifyId}`)}
              >
                {/* Cover */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
                  {album?.cover_url ? (
                    <Image
                      src={album.cover_url}
                      alt={album.title ?? ''}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold font-serif">
                      {(album?.title ?? '??').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h3
                        className="font-semibold text-sm truncate"
                        style={{ color: 'var(--text)' }}
                      >
                        {album?.title ?? 'Unknown Album'}
                      </h3>
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>
                        {album?.artist ?? 'Unknown Artist'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StarRow rating={r.rating} />
                      <span
                        className="text-sm font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {Number(r.rating).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {r.review && (
                    <p
                      className="text-xs leading-relaxed italic mt-2"
                      style={{ color: 'var(--muted)' }}
                    >
                      "{r.review}"
                    </p>
                  )}
                  <p className="text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
                    {r.updated_at ? new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
