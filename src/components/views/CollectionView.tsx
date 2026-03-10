'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { AlbumCard } from '@/components/ui/AlbumCard'

const tabs = ['All', 'Favorites', 'Want to Listen', 'Listened']

const collection = [
  { title: 'folklore', artist: 'Taylor Swift', rating: 5.0, initials: 'FL', tag: 'Favorites' },
  { title: 'Blonde', artist: 'Frank Ocean', rating: 5.0, initials: 'BL', tag: 'Favorites' },
  { title: 'In Rainbows', artist: 'Radiohead', rating: 4.9, initials: 'IR', tag: 'Listened' },
  { title: 'GNX', artist: 'Kendrick Lamar', rating: 4.7, initials: 'GN', tag: 'Favorites' },
  { title: 'Brat', artist: 'Charli XCX', rating: 4.6, initials: 'BR', tag: 'Listened' },
  { title: 'Vespertine', artist: 'Björk', rating: 0, initials: 'VS', tag: 'Want to Listen' },
  { title: 'OK Computer', artist: 'Radiohead', rating: 0, initials: 'OK', tag: 'Want to Listen' },
  { title: 'The Miseducation', artist: 'Lauryn Hill', rating: 4.8, initials: 'MS', tag: 'Favorites' },
]

export function CollectionView() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? collection : collection.filter((a) => a.tag === activeTab)

  return (
    <>
      <Header title="My Collection" />

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === tab
                ? 'bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900'
                : 'bg-brown-600/12 dark:bg-gray-400/15 hover:bg-brown-600/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filtered.map((album) => (
          <AlbumCard key={album.title} {...album} />
        ))}
      </div>
    </>
  )
}
