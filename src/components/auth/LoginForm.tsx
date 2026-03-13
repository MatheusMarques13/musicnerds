'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Loader2 } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin]   = useState(true)
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage({ type: 'error', text: error.message })
      else window.location.href = '/app'
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) setMessage({ type: 'error', text: error.message })
      else setMessage({ type: 'success', text: 'Check your email to confirm your account!' })
    }

    setLoading(false)
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div
      className="rounded-3xl border p-8"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-hover)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Heading */}
      <h2
        className="font-serif font-bold mb-1"
        style={{ fontSize: 26, color: 'var(--text)', letterSpacing: '-0.3px' }}
      >
        {isLogin ? 'Welcome back' : 'Create account'}
      </h2>
      <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
        {isLogin
          ? 'Sign in to your MusicNerds account'
          : 'Join thousands of music enthusiasts'}
      </p>

      {/* Sign In / Sign Up toggle tabs */}
      <div
        className="flex rounded-xl p-1 mb-7"
        style={{ backgroundColor: 'rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}
      >
        {['Sign In', 'Sign Up'].map((tab) => {
          const active = tab === 'Sign In' ? isLogin : !isLogin
          return (
            <button
              key={tab}
              type="button"
              onClick={() => { setIsLogin(tab === 'Sign In'); setMessage(null) }}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: active ? 'var(--bg-pill)' : 'transparent',
                color: active ? 'var(--text)' : 'var(--muted)',
                boxShadow: active ? 'var(--shadow-card)' : 'none',
                border: active ? '1px solid var(--border)' : '1px solid transparent',
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Email */}
        <div style={{ position: 'relative' }}>
          <Mail
            size={15}
            style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--muted)', pointerEvents: 'none',
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              paddingLeft: 40, paddingRight: 14,
              paddingTop: 12, paddingBottom: 12,
              border: '1.5px solid var(--border)',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.70)',
              color: 'var(--text)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* Password */}
        <div style={{ position: 'relative' }}>
          <Lock
            size={15}
            style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--muted)', pointerEvents: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              paddingLeft: 40, paddingRight: 14,
              paddingTop: 12, paddingBottom: 12,
              border: '1.5px solid var(--border)',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.70)',
              color: 'var(--text)',
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* Forgot password (sign-in only) */}
        {isLogin && (
          <div style={{ textAlign: 'right', marginTop: -4 }}>
            <a href="#" style={{ fontSize: 12.5, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              Forgot password?
            </a>
          </div>
        )}

        {/* Status message */}
        {message && (
          <p
            style={{
              fontSize: 13,
              padding: '10px 14px',
              borderRadius: 10,
              background: message.type === 'error' ? 'rgba(200,50,50,0.08)' : 'rgba(33,128,141,0.09)',
              color: message.type === 'error' ? '#c03030' : 'var(--accent)',
              border: `1px solid ${message.type === 'error' ? 'rgba(200,50,50,0.18)' : 'rgba(33,128,141,0.18)'}`,
            }}
          >
            {message.text}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '13px 0',
            background: loading ? 'var(--muted)' : 'var(--text)',
            color: 'white',
            fontWeight: 600,
            fontSize: 15,
            border: 'none',
            borderRadius: 100,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 4,
            transition: 'background 0.15s',
            letterSpacing: '-0.1px',
          }}
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        style={{
          width: '100%',
          padding: '12px 0',
          border: '1.5px solid var(--border)',
          borderRadius: 100,
          fontSize: 14,
          fontWeight: 600,
          background: 'rgba(255,255,255,0.60)',
          color: 'var(--text)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.90)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.60)' }}
      >
        {/* Google "G" logo */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11 0 20.5-8 20.5-20.5 0-1.4-.1-2.7-.4-4z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5c-7.7 0-14.4 4.4-17.7 10.2z"/>
          <path fill="#4CAF50" d="M24 45.5c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 37 26.8 38 24 38c-5.1 0-9.5-3.4-11.1-8.1l-6.5 5C9.6 41.1 16.3 45.5 24 45.5z"/>
          <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6.2 5.2C40.8 35.5 44 30.7 44 25c0-1.4-.1-2.7-.4-4z"/>
        </svg>
        Continue with Google
      </button>
    </div>
  )
}
