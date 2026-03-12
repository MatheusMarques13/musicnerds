'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, Search, BarChart2, Rss,
  Users, List, TrendingUp, Archive, Star, Music2
} from 'lucide-react'

const nav = [
  { label: 'DISCOVER', items: [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/explore', icon: Search, label: 'Explore' },
    { href: '/charts', icon: BarChart2, label: 'Charts' },
  ]},
  { label: 'SOCIAL', items: [
    { href: '/feed', icon: Rss, label: 'Activity Feed' },
    { href: '/communities', icon: Users, label: 'Communities' },
    { href: '/lists', icon: List, label: 'Collaborative Lists' },
  ]},
  { label: 'YOUR MUSIC', items: [
    { href: '/stats', icon: TrendingUp, label: 'Your Stats' },
    { href: '/collection', icon: Archive, label: 'Collection' },
    { href: '/ratings', icon: Star, label: 'Your Ratings' },
  ]},
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r overflow-y-auto"
      style={{
        backgroundColor: 'rgba(244, 241, 234, 0.92)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Music2 size={16} className="text-white" />
          </div>
          <span className="font-serif text-xl font-bold" style={{ color: 'var(--text)' }}>MusicNerds</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">
        {nav.map((group) => (
          <div key={group.label}>
            <p
              className="px-3 mb-2 text-[10px] font-semibold tracking-[0.18em]"
              style={{ color: 'var(--muted)' }}
            >
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(({ href, icon: Icon, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: active ? 'rgba(33,128,141,0.10)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                      borderLeft: active ? '2.5px solid var(--accent)' : '2.5px solid transparent',
                    }}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
          MusicNerds © 2026
        </p>
      </div>
    </aside>
  )
}
