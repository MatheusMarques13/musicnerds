'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Users } from 'lucide-react'

const communities = [
  { name: 'Synthwave Lovers', description: 'For fans of 80s-inspired electronic music, retrowave, and all things neon.', genre: 'Electronic', members: 12400, emoji: '🌆' },
  { name: 'Taylor Swift Fans', description: 'All eras, all albums. A safe space for Swifties to share and discuss.', genre: 'Pop', members: 89000, emoji: '🤍' },
  { name: 'Indie Rock Underground', description: 'Discover underground indie bands and share your hidden gems.', genre: 'Indie Rock', members: 34200, emoji: '🎸' },
  { name: 'Jazz & Soul Collective', description: 'From Miles Davis to modern jazz. Timeless music for timeless people.', genre: 'Jazz', members: 8900, emoji: '🎺' },
  { name: 'Hip-Hop Heads', description: 'Lyricism, beats, and culture. Everything hip-hop from 90s to now.', genre: 'Hip-Hop', members: 56700, emoji: '🎤' },
  { name: 'K-Pop Universe', description: 'Stan culture, album reviews, and everything K-Pop.', genre: 'K-Pop', members: 102000, emoji: '⭐' },
]

export function CommunitiesView() {
  const [joined, setJoined] = useState<string[]>(['Taylor Swift Fans'])

  function toggleJoin(name: string) {
    setJoined((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  return (
    <>
      <Header title="Communities" />

      <div className="flex flex-col gap-4">
        {communities.map((c) => (
          <div key={c.name} className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">{c.emoji} {c.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-300/70 mt-1">
                  <Users size={12} />
                  <span>{c.members.toLocaleString()} members • {c.genre}</span>
                </div>
              </div>
              <button
                onClick={() => toggleJoin(c.name)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  joined.includes(c.name)
                    ? 'bg-brown-600/12 dark:bg-gray-400/15 text-slate-600 dark:text-gray-300'
                    : 'bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 hover:bg-teal-600'
                }`}
              >
                {joined.includes(c.name) ? 'Joined ✓' : 'Join'}
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-gray-300/70">{c.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
