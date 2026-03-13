'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Clock, Music2, ExternalLink, Star, BookmarkPlus, Loader2 } from 'lucide-react'

function msToTime(ms: number) {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Upsert album into the albums table and return its UUID. */
async function upsertAlbum(supabase: any, album: any, spotifyId: string): Promise<string> {
  const { data, error } = await supabase
    .from('albums')
    .upsert(
      {
        spotify_id: spotifyId,
        title: album?.title ?? 'Unknown Album',
        artist: album?.artist ?? 'Unknown Artist',
        cover_url: album?.cover_url ?? null,
        release_year: album?.release_date
          ? Number(album.release_date.split('-')[0])
          : album?.release_year
          ? Number(album.release_year)
          : null,
      },
      { onConflict: 'spotify_id' }
    )
    .select('id')
    .single()
  if (error) throw error
  return data.id as string
}

export function AlbumDetailView({ albumId }: { albumId: string }) {
  const [album, setAlbum]               = useState<any>(null)
  const [tracks, setTracks]             = useState<any[]>([])
  const [lastfm, setLastfm]             = useState<any>(null)
  const [loading, setLoading]           = useState(true)
  const [userRating, setUserRating]     = useState(0)
  const [hoverRating, setHoverRating]   = useState(0)
  const [saving, setSaving]             = useState(false)
  const [statusMsg, setStatusMsg]       = useState('')
  const [user, setUser]                 = useState<any>(null)
  const router   = useRouter()
  const supabase = createClient()

  /* ── Load album data from API ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const cached = sessionStorage.getItem(`album_${albumId}`)
    if (cached) { try { setAlbum(JSON.parse(cached)) } catch {} }

    fetch(`/api/albums/${albumId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setTracks(data.tracks ?? [])
          setLastfm(data.lastfm ?? null)
          if (data.title && data.title !== 'Unknown Album') setAlbum(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [albumId])

  /* ── Load existing user rating via albums → ratings join ── */
  useEffect(() => {
    if (!user || !albumId) return
    async function loadRating() {
      const { data: albumRow } = await supabase
        .from('albums')
        .select('id')
        .eq('spotify_id', albumId)
        .single()
      if (!albumRow) return
      const { data: ratingRow } = await supabase
        .from('ratings')
        .select('rating')
        .eq('user_id', user.id)
        .eq('album_id', albumRow.id)
        .single()
      if (ratingRow) setUserRating(ratingRow.rating)
    }
    loadRating()
  }, [user, albumId])

  /* ── Save / update rating ── */
  async function handleRate(stars: number) {
    if (!user) { router.push('/login'); return }
    setSaving(true)
    try {
      const albumDbId = await upsertAlbum(supabase, album, albumId)
      await supabase
        .from('ratings')
        .upsert(
          { user_id: user.id, album_id: albumDbId, rating: stars, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,album_id' }
        )
      setUserRating(stars)
      flash('Rating saved ✓')
    } catch (err) {
      console.error('[handleRate]', err)
      flash('Failed to save rating')
    } finally {
      setSaving(false)
    }
  }

  /* ── Save to collection ── */
  async function handleAddToCollection() {
    if (!user) { router.push('/login'); return }
    try {
      await supabase
        .from('collection')
        .upsert(
          {
            user_id: user.id,
            spotify_id: albumId,
            album_title: album?.title,
            artist: album?.artist,
            cover_url: album?.cover_url ?? null,
            release_year: album?.release_date?.split('-')[0] ?? album?.release_year ?? null,
            status: 'listened',
          },
          { onConflict: 'user_id,spotify_id' }
        )
      flash('Added to collection ✓')
    } catch (err) {
      console.error('[handleAddToCollection]', err)
      flash('Failed to save')
    }
  }

  function flash(msg: string) {
    setStatusMsg(msg)
    setTimeout(() => setStatusMsg(''), 2400)
  }

  /* ── Loading states ── */
  if (!album && loading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
    </div>
  )

  if (!album) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="font-serif text-2xl" style={{ color: 'var(--text)' }}>Album not found</p>
      <button onClick={() => router.back()} className="text-sm" style={{ color: 'var(--accent)' }}>
        Go back
      </button>
    </div>
  )

  const displayRating = hoverRating || userRating

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
        style={{ color: 'var(--muted)' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Hero */}
      <div
        className="rounded-3xl border p-8 mb-8"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Cover */}
          <div
            className="relative w-44 h-44 shrink-0 rounded-2xl overflow-hidden mx-auto sm:mx-0"
            style={{ boxShadow: 'var(--shadow-hover)' }}
          >
            {album.cover_url ? (
              <Image src={album.cover_url} alt={album.title} fill className="object-cover" sizes="176px" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-serif text-white text-4xl"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {album.title?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
                Album
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight mb-1" style={{ color: 'var(--text)' }}>
                {album.title}
              </h1>
              <p className="text-lg mb-4" style={{ color: 'var(--muted)' }}>{album.artist}</p>

              <div className="flex flex-wrap gap-3 text-xs mb-4" style={{ color: 'var(--muted)' }}>
                {album.release_date && <span>📅 {album.release_date}</span>}
                {album.total_tracks > 0 && (
                  <span><Music2 size={12} className="inline mr-1" />{album.total_tracks} tracks</span>
                )}
                {lastfm?.listeners && (
                  <span>👥 {Number(lastfm.listeners).toLocaleString()} listeners</span>
                )}
                {lastfm?.playcount && (
                  <span>▶️ {Number(lastfm.playcount).toLocaleString()} plays</span>
                )}
              </div>

              {lastfm?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {lastfm.tags.slice(0, 5).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium border"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)', backgroundColor: 'var(--bg-pill)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-[11px] mb-1.5" style={{ color: 'var(--muted)' }}>
                  {userRating > 0 ? `Your rating: ${userRating}/5` : 'Rate this album'}
                </p>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRate(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={22}
                        style={{ color: 'var(--accent-warm)' }}
                        fill={displayRating >= star ? 'var(--accent-warm)' : 'none'}
                      />
                    </button>
                  ))}
                  {saving && <Loader2 size={14} className="animate-spin ml-1" style={{ color: 'var(--accent)' }} />}
                  {statusMsg && <span className="text-xs ml-1" style={{ color: 'var(--accent)' }}>{statusMsg}</span>}
                </div>
              </div>

              <button
                onClick={handleAddToCollection}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all active:scale-95"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-pill)', color: 'var(--text)' }}
              >
                <BookmarkPlus size={15} /> Save
              </button>

              <a
                href={`https://open.spotify.com/album/${albumId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95"
                style={{ backgroundColor: 'rgba(29,185,84,0.12)', color: '#1DB954' }}
              >
                <ExternalLink size={14} /> Spotify
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wiki */}
      {lastfm?.wiki && (
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h2 className="font-serif text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>About</h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--muted)' }}
            dangerouslySetInnerHTML={{ __html: lastfm.wiki.split('<a ')[0] }}
          />
        </div>
      )}

      {/* Tracklist */}
      {tracks.length > 0 && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="font-serif text-lg font-bold" style={{ color: 'var(--text)' }}>Tracklist</h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {tracks.map((track: any) => (
              <div
                key={track.number}
                className="flex items-center gap-4 px-6 py-3 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(33,128,141,0.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="text-xs w-5 text-right shrink-0" style={{ color: 'var(--muted)' }}>
                  {track.number}
                </span>
                <span className="flex-1 text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                  {track.title}
                </span>
                <span className="text-xs flex items-center gap-1 shrink-0" style={{ color: 'var(--muted)' }}>
                  <Clock size={11} />{msToTime(track.duration_ms)}
                </span>
                {track.preview_url && (
                  <audio controls src={track.preview_url} className="h-6 w-20 opacity-50 hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && tracks.length === 0 && (
        <div className="flex items-center gap-2 mt-6" style={{ color: 'var(--muted)' }}>
          <Loader2 size={14} className="animate-spin" />
          <span className="text-sm">Loading tracklist…</span>
        </div>
      )}
    </div>
  )
}
