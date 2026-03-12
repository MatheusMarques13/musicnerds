'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft, Clock, Music2, ExternalLink,
  Star, BookmarkPlus, Loader2
} from 'lucide-react'

function msToTime(ms: number) {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AlbumDetailView({ albumId }: { albumId: string }) {
  const [album, setAlbum] = useState<any>(null)
  const [tracks, setTracks] = useState<any[]>([])
  const [lastfm, setLastfm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    // 1. Load metadata from sessionStorage immediately (instant display)
    const cached = sessionStorage.getItem(`album_${albumId}`)
    if (cached) {
      try { setAlbum(JSON.parse(cached)) } catch {}
    }

    // 2. Fetch tracks + Last.fm from API
    fetch(`/api/albums/${albumId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setTracks(data.tracks ?? [])
          setLastfm(data.lastfm ?? null)
          // If we got full album data from API, merge it
          if (data.title && data.title !== 'Unknown Album') {
            setAlbum(data)
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [albumId])

  useEffect(() => {
    if (!user || !albumId) return
    supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('spotify_id', albumId)
      .single()
      .then(({ data }) => { if (data) setUserRating(data.rating) })
  }, [user, albumId])

  async function handleRate(stars: number) {
    if (!user) { router.push('/login'); return }
    setSaving(true)
    await supabase.from('ratings').upsert({
      user_id: user.id,
      spotify_id: albumId,
      album_title: album?.title,
      artist: album?.artist,
      cover_url: album?.cover_url,
      rating: stars,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,spotify_id' })
    setUserRating(stars)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleAddToCollection() {
    if (!user) { router.push('/login'); return }
    await supabase.from('collection').upsert({
      user_id: user.id,
      spotify_id: albumId,
      album_title: album?.title,
      artist: album?.artist,
      cover_url: album?.cover_url,
      status: 'listened',
    }, { onConflict: 'user_id,spotify_id' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Show loading only if we have no data at all
  if (!album && loading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 size={32} className="animate-spin text-teal-500" />
    </div>
  )

  if (!album) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-2xl">😕 Album not found</p>
      <button onClick={() => router.back()} className="text-teal-500 hover:underline">Go back</button>
    </div>
  )

  const displayRating = hoverRating || userRating

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <div className="relative w-48 h-48 shrink-0 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-teal-500 to-teal-700 mx-auto sm:mx-0">
          {album.cover_url ? (
            <Image src={album.cover_url} alt={album.title} fill className="object-cover" sizes="192px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
              {album.title?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-500 font-semibold mb-1">Album</p>
            <h1 className="text-3xl font-bold mb-1 leading-tight">{album.title}</h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 mb-3">{album.artist}</p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-400 dark:text-gray-500 mb-4">
              {(album.release_date || album.release_year) && (
                <span>📅 {album.release_date ?? album.release_year}</span>
              )}
              {(album.total_tracks > 0) && (
                <span><Music2 size={14} className="inline" /> {album.total_tracks} tracks</span>
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
                  <span key={tag} className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-300 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-slate-400">{userRating > 0 ? `Your rating: ${userRating}/5` : 'Rate this album'}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRate(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={24}
                      className={displayRating >= star ? 'text-amber-400' : 'text-slate-300 dark:text-gray-600'}
                      fill={displayRating >= star ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
                {saving && <Loader2 size={18} className="animate-spin text-teal-500 ml-1" />}
                {saved && <span className="text-xs text-teal-500 ml-1">Saved! ✓</span>}
              </div>
            </div>

            <button
              onClick={handleAddToCollection}
              className="flex items-center gap-2 px-4 py-2 bg-brown-600/10 dark:bg-gray-400/15 rounded-full text-sm font-medium hover:bg-brown-600/20 transition-colors"
            >
              <BookmarkPlus size={16} /> Add to Collection
            </button>

            <a
              href={`https://open.spotify.com/album/${albumId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1DB954]/15 text-[#1DB954] rounded-full text-sm font-medium hover:bg-[#1DB954]/25 transition-colors"
            >
              <ExternalLink size={14} /> Open in Spotify
            </a>
          </div>
        </div>
      </div>

      {/* Wiki */}
      {lastfm?.wiki && (
        <div className="mb-8 p-5 bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl">
          <h2 className="font-bold mb-2">About</h2>
          <p
            className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lastfm.wiki.split('<a ')[0] }}
          />
        </div>
      )}

      {/* Tracklist */}
      {tracks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Tracklist</h2>
          <div className="flex flex-col divide-y divide-brown-600/10 dark:divide-gray-400/15">
            {tracks.map((track: any) => (
              <div key={track.number} className="flex items-center gap-4 py-3 hover:bg-brown-600/5 px-2 rounded-lg transition-colors">
                <span className="text-slate-400 text-sm w-6 text-right shrink-0">{track.number}</span>
                <span className="flex-1 text-sm font-medium truncate">{track.title}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock size={12} />{msToTime(track.duration_ms)}
                </span>
                {track.preview_url && (
                  <audio controls src={track.preview_url} className="h-6 w-24 opacity-60 hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading indicator for tracks */}
      {loading && tracks.length === 0 && (
        <div className="flex items-center gap-2 text-slate-400 mt-8">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Loading tracklist...</span>
        </div>
      )}
    </div>
  )
}
