'use client'

import { useState, useEffect } from 'react'
import { SearchResult } from './useSearch'

export function useNewReleases() {
  const [albums, setAlbums] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch_() {
      try {
        const res = await fetch('/api/albums/new-releases')
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setAlbums(data.albums ?? [])
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [])

  return { albums, loading, error }
}
