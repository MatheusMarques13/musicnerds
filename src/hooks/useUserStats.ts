'use client'

import { useState, useEffect } from 'react'

export type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month'

export interface UserStats {
  user: any
  topArtists: any[]
  topAlbums: any[]
  recentTracks: any[]
}

export function useUserStats(username: string, period: Period = '1month') {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return
    setLoading(true)
    async function fetch_() {
      try {
        const res = await fetch(`/api/users/${username}/stats?period=${period}`)
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setStats(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [username, period])

  return { stats, loading, error }
}
