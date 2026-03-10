'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User, ChevronDown, Loader2 } from 'lucide-react'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const username = user?.user_metadata?.username ?? user?.email?.split('@')[0] ?? 'guest'
  const initial = username[0].toUpperCase()

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="relative" ref={dropdownRef}>
        {loading ? (
          <div className="w-10 h-10 flex items-center justify-center">
            <Loader2 size={18} className="animate-spin text-teal-500" />
          </div>
        ) : user ? (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 bg-cream-100 dark:bg-charcoal-800 border border-brown-600/20 dark:border-gray-400/30 rounded-full hover:bg-brown-600/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-500 dark:bg-teal-300 flex items-center justify-center text-cream-50 dark:text-slate-900 font-bold text-sm">
              {initial}
            </div>
            <span className="text-sm font-medium">@{username}</span>
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors"
          >
            <User size={14} /> Sign In
          </button>
        )}

        {open && user && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-cream-100 dark:bg-charcoal-800 border border-brown-600/20 dark:border-gray-400/30 rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-brown-600/10 dark:border-gray-400/20">
              <p className="text-xs text-slate-500 dark:text-gray-400">Signed in as</p>
              <p className="text-sm font-semibold truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
