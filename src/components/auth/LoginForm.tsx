'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Loader2 } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        window.location.href = '/'
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Check your email to confirm your account!' })
      }
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
    <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/20 dark:border-gray-400/30 rounded-2xl p-8 shadow-md">
      <h2 className="text-xl font-bold mb-6">{isLogin ? 'Sign In' : 'Create Account'}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-lg bg-cream-50 dark:bg-charcoal-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-300"
          />
        </div>

        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-lg bg-cream-50 dark:bg-charcoal-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-300"
          />
        </div>

        {message && (
          <p className={`text-sm px-3 py-2 rounded-lg ${
            message.type === 'error'
              ? 'bg-red-500/10 text-red-500'
              : 'bg-teal-500/10 text-teal-600 dark:text-teal-300'
          }`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 font-semibold rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-brown-600/20 dark:bg-gray-400/30" />
        <span className="text-xs text-slate-400">or</span>
        <div className="flex-1 h-px bg-brown-600/20 dark:bg-gray-400/30" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 border border-brown-600/20 dark:border-gray-400/30 rounded-lg text-sm font-medium hover:bg-brown-600/10 dark:hover:bg-gray-400/15 transition-colors flex items-center justify-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11 0 20.5-8 20.5-20.5 0-1.4-.1-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5c-7.7 0-14.4 4.4-17.7 10.2z"/><path fill="#4CAF50" d="M24 45.5c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 37 26.8 38 24 38c-5.1 0-9.5-3.4-11.1-8.1l-6.5 5C9.6 41.1 16.3 45.5 24 45.5z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6.2 5.2C40.8 35.5 44 30.7 44 25c0-1.4-.1-2.7-.4-4z"/></svg>
        Continue with Google
      </button>

      <p className="text-center text-sm mt-6 text-slate-500">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => { setIsLogin(!isLogin); setMessage(null) }}
          className="text-teal-500 dark:text-teal-300 font-semibold hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  )
}
