'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/Header'
import { StatCard } from '@/components/ui/StatCard'
import { Loader2 } from 'lucide-react'

interface ArtistStat { artist: string; count: number; avgRating: number }
interface AlbumStat  { title: string; artist: string; rating: number; cover_url: string | null; spotify_id: string | null }

export function StatsView() {
  const [loading, setLoading]               = useState(true)
  const [totalRatings, setTotalRatings]     = useState(0)
  const [totalCollection, setTotalCollection] = useState(0)
  const [topArtists, setTopArtists]         = useState<ArtistStat[]>([])
  const [topAlbums, setTopAlbums]           = useState<AlbumStat[]>([])
  const [overallAvg, setOverallAvg]         = useState(0)
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const [{ data: ratingsData }, { count: collCount }] = await Promise.all([
        supabase
          .from('ratings')
          .select('rating, albums(title, artist, cover_url, spotify_id)')
          .eq('user_id', user.id)
          .order('rating', { ascending: false }),
        supabase
          .from('collection')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ])

      const ratings = ratingsData ?? []
      setTotalRatings(ratings.length)
      setTotalCollection(collCount ?? 0)

      if (ratings.length > 0) {
        const avg = ratings.reduce((s: number, r: any) => s + Number(r.rating), 0) / ratings.length
        setOverallAvg(avg)
      }

      // Top albums (highest rated)
      setTopAlbums(
        ratings.slice(0, 5).map((r: any) => ({
          title:    r.albums?.title    ?? 'Unknown',
          artist:   r.albums?.artist   ?? '',
          rating:   r.rating,
          cover_url: r.albums?.cover_url ?? null,
          spotify_id: r.albums?.spotify_id ?? null,
        }))
      )

      // Top artists (most rated, then avg rating as tiebreak)
      const artistMap: Record<string, { total: number; count: number }> = {}
      for (const r of ratings) {
        const name = (r as any).albums?.artist ?? 'Unknown'
        if (!artistMap[name]) artistMap[name] = { total: 0, count: 0 }
        artistMap[name].total += Number(r.rating)
        artistMap[name].count += 1
      }
      setTopArtists(
        Object.entries(artistMap)
          .map(([artist, { total, count }]) => ({ artist, count, avgRating: total / count }))
          .sort((a, b) => b.count - a.count || b.avgRating - a.avgRating)
          .slice(0, 5)
      )

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <>
      <Header title="Your Stats" />
      <div className="flex items-center justify-center py-24">
        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
      </div>
    </>
  )

  return (
    <>
      <Header title="Your Stats" />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Albums Rated"  value={totalRatings.toLocaleString()} />
        <StatCard label="In Collection" value={totalCollection.toLocaleString()} />
        <StatCard label="Artists"       value={topArtists.length.toLocaleString()} />
        <StatCard label="Avg Rating"    value={overallAvg > 0 ? overallAvg.toFixed(2) : '—'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Artists */}
        <div
          className="rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-card)' }}
        >
          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--muted)' }}>
            Top Artists
          </h3>
          {topArtists.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Rate some albums to see your top artists.</p>
          ) : topArtists.map((a, i) => (
            <div key={a.artist} className="flex items-center gap-3 py-2.5">
              <span className="text-sm font-bold w-5 text-right shrink-0" style={{ color: 'var(--muted)' }}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{a.artist}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {a.count} album{a.count !== 1 ? 's' : ''} · avg {a.avgRating.toFixed(1)}
                </p>
              </div>
              <div className="h-2 rounded-full overflow-hidden w-24 shrink-0" style={{ backgroundColor: 'rgba(33,128,141,0.12)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(a.count / (topArtists[0]?.count || 1)) * 100}%`, backgroundColor: 'var(--accent)' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Top Albums */}
        <div
          className="rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-card)' }}
        >
          <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--muted)' }}>
            Highest Rated
          </h3>
          {topAlbums.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Rate some albums to see your favourites.</p>
          ) : topAlbums.map((a, i) => (
            <div
              key={a.title + i}
              className="flex items-center gap-3 py-2.5 cursor-pointer rounded-lg transition-colors"
              onClick={() => a.spotify_id && router.push(`/album/${a.spotify_id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(33,128,141,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span className="text-sm font-bold w-5 text-right shrink-0" style={{ color: 'var(--muted)' }}>
                {i + 1}
              </span>
              <div
                className="w-9 h-9 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--accent)', position: 'relative' }}
              >
                {a.cover_url ? (
                  <Image src={a.cover_url} alt={a.title} fill className="object-cover" sizes="36px" />
                ) : (
                  a.title.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{a.title}</p>
                <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{a.artist}</p>
              </div>
              <span className="text-sm font-bold shrink-0" style={{ color: 'var(--accent-warm)' }}>
                {Number(a.rating).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
