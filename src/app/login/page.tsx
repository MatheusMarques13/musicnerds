import { LoginForm } from '@/components/auth/LoginForm'
import { Music2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>

      {/* ── Left panel – brand / hero ─────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col w-[52%] shrink-0 relative overflow-hidden"
        style={{ background: '#A4C8DC' }}
      >
        {/* SVG Scenery */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 760 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <circle cx="380" cy="520" r="220" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
          <circle cx="380" cy="520" r="310" stroke="rgba(255,255,255,0.11)" strokeWidth="1.5" />
          <circle cx="380" cy="520" r="405" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
          <ellipse cx="90"  cy="200" rx="105" ry="74" fill="rgba(255,255,255,0.68)" />
          <ellipse cx="60"  cy="222" rx="80"  ry="60" fill="rgba(255,255,255,0.60)" />
          <ellipse cx="145" cy="218" rx="90"  ry="66" fill="rgba(255,255,255,0.62)" />
          <ellipse cx="620" cy="150" rx="110" ry="80" fill="rgba(255,255,255,0.72)" />
          <ellipse cx="578" cy="170" rx="85"  ry="64" fill="rgba(255,255,255,0.64)" />
          <ellipse cx="668" cy="168" rx="94"  ry="70" fill="rgba(255,255,255,0.66)" />
          <polygon points="0,780 130,570 270,780"   fill="#8BAFC6" />
          <polygon points="100,780 240,595 390,780" fill="#7DA2BC" />
          <polygon points="480,780 620,560 760,780" fill="#90ADBF" />
          <polygon points="480,860 620,530 760,860" fill="#2E2E2E" />
          <path d="M560,800 Q660,750 760,770 L760,900 L530,900 Z" fill="#D4B47A" />
          <rect x="0"   y="780" width="760" height="120" fill="#7DA2BC" />
          <rect x="0"   y="830" width="480" height="70"  fill="#6E97B0" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
            >
              <Music2 size={18} color="white" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'white', letterSpacing: '-0.2px' }}>
              MusicNerds
            </span>
          </Link>

          {/* Headline */}
          <div className="mt-auto mb-auto pt-16">
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 42,
                lineHeight: 1.18,
                fontWeight: 700,
                color: '#0C0C0C',
                letterSpacing: '-0.5px',
                marginBottom: 28,
                maxWidth: 300,
              }}
            >
              Discover, rate, and share your love for music.
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Rate every album you listen to',          dot: '#FFCDC4' },
                { label: 'Follow friends and see what they love',   dot: '#C4E8D0' },
                { label: 'Build lists. Find communities. Explore.', dot: '#E2D4F0' },
              ].map(({ label, dot }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: dot, flexShrink: 0,
                      boxShadow: '0 0 0 3px rgba(255,255,255,0.40)',
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(12,12,12,0.75)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini album document tiles */}
          <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
            {[
              { bg: '#FFCDC4', accent: '#c0392b', title: 'The Tortured Poets Dept.', artist: 'Taylor Swift' },
              { bg: '#C4E8D0', accent: '#1a7a3a', title: 'GNX',                     artist: 'Kendrick Lamar' },
              { bg: '#E2D4F0', accent: '#6a2a9a', title: 'Hit Me Hard and Soft',    artist: 'Billie Eilish' },
            ].map(({ bg, accent, title, artist }) => (
              <div key={title} style={{ background: bg, borderRadius: 13, padding: '13px 14px', flex: 1 }}>
                <div
                  style={{
                    width: 26, height: 26, borderRadius: 7, background: accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                  }}
                >
                  <span style={{ color: 'white', fontSize: 9, fontWeight: 800 }}>
                    {title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: 11.5, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 3 }}>
                  {title}
                </p>
                <p style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.50)' }}>{artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel – form ────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-10"
        style={{
          background: 'var(--bg)',
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0, transparent 35px, var(--grid-color) 35px, var(--grid-color) 35.5px), repeating-linear-gradient(to bottom, transparent 0, transparent 35px, var(--grid-color) 35px, var(--grid-color) 35.5px)',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile-only logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <Music2 size={16} color="white" />
            </div>
            <span
              className="font-bold text-lg"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-serif), serif' }}
            >
              MusicNerds
            </span>
          </div>

          <LoginForm />

          <p className="text-center text-xs mt-8" style={{ color: 'var(--muted)' }}>
            By continuing you agree to MusicNerds'{' '}
            <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>.
          </p>
        </div>
      </div>

    </div>
  )
}
