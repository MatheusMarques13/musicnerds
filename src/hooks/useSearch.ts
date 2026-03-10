'use client'

import { useState, useEffect, useCallback } from 'react'

export interface SearchResult {
  id: string
  title: string
  artist: string
  cover_url: string | null
  release_year: string
  spotify_id: string
}

export function useSearch(debounceMs = 400) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.results ?? [])
    } catch (e: any) {
      setError(e.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), debounceMs)
    return () => clearTimeout(timer)
  }, [query, debounceMs, search])

  return { query, setQuery, results, loading, error }
}
