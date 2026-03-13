'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home, Search, BarChart2, Rss,
  Users, List, TrendingUp, Archive, Star, Music2,
  ChevronDown, LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const nav = [
  { label: 'DISCOVER', items: [
    { href: '/app',         icon: Home,      label: 'Home' },
    { href: '/explore',     icon: Search,    label: 'Explore' },
    { href: '/charts',      icon: BarChart2, label: 'Charts' },
  ]},
  { label: 'SOCIAL', items: [
    { href: '/feed',        icon: Rss,   label: 'Activity Feed' },
    { href: '/communities', icon: Users, label: 'Communities' },
    { href: '/lists',       icon: List,  label: 'Collaborative Lists' },
  ]},
  { label: 'YOUR MUSIC', items: [
    { href: '/stats',      icon: TrendingUp, label: 'Your Stats' },
    { href: '/collection', icon: Archive,    label: 'Collection' },
    { href: '/ratings',    icon: Star,       label: 'Your Ratings' },
  ]},
]

export function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<{ display_name: string | null; username: string } | null>(null)

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('display_name, username')
        .eq('id', user.id)
        .single()
      if (data) setProfile(data)
    }
    loadProfile()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = profile?.display_name || profile?.username || 'My Music'
  const initials    = displayName.slice(0, 2).toUpperCase()

  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r overflow-y-auto"
      style={{
        backgroundColor: 'rgba(244, 241, 234, 0.95)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Logo ── */}
      <div className="px-5 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #1a6870 100%)' }}
          >
            <Music2 size={17} className="text-white" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            MusicNerds
          </span>
        </div>
      </div>

      {/* ── Workspace / User selector ── */}
      <div className="px-3 pt-3 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <button
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all text-left"
          style={{ backgroundColor: 'rgba(33,128,141,0.09)' }}
          onClick={handleSignOut}
          title="Click to sign out"
        >
          <div
            className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%)' }}
          >
            {initials}
          </div>
          <span className="text-[13px] font-semibold flex-1 truncate" style={{ color: 'var(--text)' }}>
            {displayName}
          </span>
          <LogOut size={12} style={{ color: 'var(--muted)', flexShrink: 0 }} />
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
        {nav.map((group) => (
          <div key={group.label}>
            <p
              className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em]"
              style={{ color: 'var(--muted)' }}
            >
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(({ href, icon: Icon, label }) => {
                const active = pathname === href || (href !== '/app' && pathname.startsWith(href))
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                    style={{
                      backgroundColor: active ? 'rgba(33,128,141,0.12)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                    }}
                  >
                    <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="px-6 py-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>MusicNerds © 2026</p>
      </div>
    </aside>
  )
}
