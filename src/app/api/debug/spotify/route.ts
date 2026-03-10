import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  // Check env vars exist
  if (!clientId || !clientSecret) {
    return NextResponse.json({
      error: 'Missing env vars',
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    })
  }

  // Try to get token
  try {
    const credentials = btoa(`${clientId}:${clientSecret}`)
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({
        error: 'Token request failed',
        status: res.status,
        spotify_error: data,
      })
    }

    // Try a real search with the token
    const searchRes = await fetch(
      'https://api.spotify.com/v1/search?q=taylor+swift&type=album&limit=1',
      { headers: { Authorization: `Bearer ${data.access_token}` } }
    )
    const searchData = await searchRes.json()

    return NextResponse.json({
      success: true,
      token_type: data.token_type,
      expires_in: data.expires_in,
      search_test: {
        status: searchRes.status,
        first_result: searchData?.albums?.items?.[0]?.name ?? null,
      }
    })
  } catch (err) {
    return NextResponse.json({ error: 'Exception', details: String(err) })
  }
}
