'use client'

import { Bell, User } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between mb-8 pb-6 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div>
        <h1
          className="font-serif text-3xl font-bold leading-tight"
          style={{ color: 'var(--text)' }}
        >
          {title ?? 'MusicNerds'}
        </h1>
        <p className="text-xs mt-0.5 tracking-wide" style={{ color: 'var(--muted)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all active:scale-95"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-pill)', color: 'var(--muted)' }}
        >
          <Bell size={16} />
        </button>
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all active:scale-95"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-pill)', color: 'var(--text)' }}
        >
          <User size={15} />
          Sign In
        </Link>
      </div>
    </header>
  )
}
