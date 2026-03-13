'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/Header'
import { AlbumCard } from '@/components/ui/AlbumCard'
import { Loader2 } from 'lucide-react'

const TABS = ['All', 'Listened', 'Favorites', 'Want to Listen'] as const
type Tab = typeof TABS[number]

const STATUS_MAP: Record<Tab, string | null> = {
  'All': null,
  'Listened': 'listened',
  'Favorites': 'favorite',
  'Want to Listen': 'want_to_listen',
}

export function CollectionView() {
  const [activeTab, setActiveTab]   = useState<Tab>('All')
  const [items, setItems]           = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data, error } = await supabase
        .from('collection')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false })
      if (error) console.error('[collection]', error)
      setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = activeTab === 'All'
    ? items
    : items.filter((i) => i.status === STATUS_MAP[activeTab])

  return (
    <>
      <Header title="My Collection" />

      {/* Tab filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'var(--accent)' : 'rgba(33,128,141,0.08)',
              color: activeTab === tab ? 'white' : 'var(--muted)',
              border: activeTab === tab ? 'none' : '1px solid transparent',
            }}
          >
            {tab}
            {tab !== 'All' && (
              <span className="ml-1.5 opacity-70">
                ({items.filter((i) => i.status === STATUS_MAP[tab]).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-2xl mb-3" style={{ color: 'var(--text)' }}>
            {activeTab === 'All' ? 'Your collection is empty' : `No ${activeTab.toLowerCase()} albums yet`}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Search for albums and hit <strong>Save</strong> on an album page to add them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <AlbumCard
              key={item.id}
              title={item.album_title ?? ''}
              artist={item.artist ?? ''}
              rating={0}
              coverUrl={item.cover_url ?? undefined}
              initials={(item.album_title ?? '??').slice(0, 2).toUpperCase()}
              spotifyId={item.spotify_id}
              releaseYear={item.release_year ?? undefined}
            />
          ))}
        </div>
      )}
    </>
  )
}
