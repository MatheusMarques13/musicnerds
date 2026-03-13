'use client'

import Link from 'next/link'
import { Music2 } from 'lucide-react'

export function LandingPage() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* ─── Navigation ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            background: 'rgba(247, 244, 238, 0.97)',
            backdropFilter: 'blur(24px)',
            borderRadius: 18,
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            boxShadow: '0 1px 14px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: '#111',
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Music2 size={17} color="white" />
            </div>
            <span
              style={{
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: '0.06em',
                color: '#111',
              }}
            >
              MUSICNERDS
            </span>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: 26, flex: 1, alignItems: 'center' }}>
            {['Discover', 'Features', 'Community', 'Pricing', 'Learn', 'Download'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
            <Link
              href="/login"
              style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: 15, fontWeight: 400 }}
            >
              Log in
            </Link>
            <Link
              href="/app"
              style={{
                background: '#111',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 100,
                padding: '9px 20px',
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Try MusicNerds Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <div
        style={{
          minHeight: '100vh',
          background: '#A4C8DC',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 148,
          paddingBottom: 0,
        }}
      >
        {/* ── SVG Scenery Background ── */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1300 920"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric circle arcs */}
          <circle cx="660" cy="460" r="195" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <circle cx="660" cy="460" r="275" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <circle cx="660" cy="460" r="358" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
          <circle cx="660" cy="460" r="445" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

          {/* ── Cloud cluster – left ── */}
          <ellipse cx="155" cy="210" rx="115" ry="82" fill="rgba(255,255,255,0.72)" />
          <ellipse cx="120" cy="235" rx="88" ry="66" fill="rgba(255,255,255,0.66)" />
          <ellipse cx="215" cy="228" rx="100" ry="72" fill="rgba(255,255,255,0.68)" />
          <ellipse cx="175" cy="250" rx="80" ry="56" fill="rgba(255,255,255,0.60)" />

          {/* ── Cloud cluster – center-right ── */}
          <ellipse cx="800" cy="195" rx="140" ry="100" fill="rgba(255,255,255,0.76)" />
          <ellipse cx="750" cy="218" rx="108" ry="80" fill="rgba(255,255,255,0.70)" />
          <ellipse cx="870" cy="215" rx="120" ry="88" fill="rgba(255,255,255,0.70)" />
          <ellipse cx="815" cy="240" rx="100" ry="70" fill="rgba(255,255,255,0.62)" />

          {/* ── Mountains – back-left – light blue-grey ── */}
          <polygon points="-20,720 140,510 310,720" fill="#8BAFC6" />
          <polygon points="80,720 235,530 400,720" fill="#7DA2BC" />
          <polygon points="180,720 340,548 510,720" fill="#8AB4CA" />

          {/* ── Mountains – back-right – lighter muted ── */}
          <polygon points="820,720 970,500 1110,720" fill="#90ADBF" />
          <polygon points="920,720 1060,515 1195,720" fill="#8AA7BA" />

          {/* ── Mountain – hero dark (right side) ── */}
          <polygon points="920,780 1080,460 1255,780" fill="#2E2E2E" />
          <polygon points="870,780 1020,488 1160,780" fill="#3A3A3A" />

          {/* ── Sandy / warm terrain – bottom-right ── */}
          <path
            d="M1020,780 Q1120,720 1300,740 L1300,920 L980,920 Z"
            fill="#D4B47A"
          />
          <path
            d="M1100,800 Q1200,760 1300,775 L1300,920 L1070,920 Z"
            fill="#C8A460"
          />

          {/* ── Ground fill ── */}
          <rect x="0" y="780" width="1300" height="140" fill="#7DA2BC" />
          <rect x="0" y="830" width="820" height="90" fill="#6E97B0" />
        </svg>

        {/* ── Heading ── */}
        <h1
          style={{
            fontFamily: 'var(--font-serif), Georgia, "Times New Roman", serif',
            fontSize: 'clamp(40px, 5.8vw, 68px)',
            fontWeight: 700,
            color: '#0C0C0C',
            textAlign: 'center',
            maxWidth: 740,
            lineHeight: 1.17,
            letterSpacing: '-0.5px',
            position: 'relative',
            zIndex: 10,
            marginBottom: 36,
            padding: '0 24px',
          }}
        >
          Your space for music, albums, and big discoveries
        </h1>

        {/* ── CTA Button ── */}
        <button
          style={{
            background: 'rgba(255,255,255,0.90)',
            border: '1.5px solid rgba(0,0,0,0.10)',
            borderRadius: 100,
            padding: '14px 38px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            color: '#1a1a1a',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
            position: 'relative',
            zIndex: 10,
            marginBottom: 60,
            letterSpacing: '-0.1px',
          }}
          onClick={() => { window.location.href = '/app' }}
        >
          Try MusicNerds Free
        </button>

        {/* ── macOS App Window Mockup ── */}
        <div
          style={{
            width: '84%',
            maxWidth: 920,
            background: 'white',
            borderRadius: '14px 14px 0 0',
            boxShadow:
              '0 -2px 40px rgba(0,0,0,0.06), 0 24px 80px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              background: '#EAE7E1',
              padding: '11px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1px solid #D6D1C8',
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: c,
                    border: '0.5px solid rgba(0,0,0,0.08)',
                  }}
                />
              ))}
            </div>

            {/* Back / forward */}
            <div style={{ display: 'flex', gap: 2, color: '#AAA', fontSize: 16, flexShrink: 0 }}>
              <span>‹</span>
              <span>›</span>
            </div>

            {/* Address tab */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: 'white',
                  borderRadius: 9,
                  padding: '4px 22px',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  color: '#555',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <Music2 size={11} color="#888" />
                All Albums
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#AAA" strokeWidth="1.5" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1a6 6 0 100 12A6 6 0 007.5 1z" stroke="#AAA" strokeWidth="1.5" />
                <path d="M7.5 4v4l2.5 1.5" stroke="#AAA" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #21808D, #B87333)',
                  flexShrink: 0,
                }}
              />
            </div>
          </div>

          {/* App Body */}
          <div style={{ display: 'flex', height: 392 }}>
            {/* ── Sidebar ── */}
            <div
              style={{
                width: 188,
                borderRight: '1px solid #EAE6DF',
                background: 'rgba(244,241,234,0.85)',
                flexShrink: 0,
                overflow: 'hidden',
                fontSize: 12,
              }}
            >
              {/* New doc button */}
              <div style={{ padding: '11px 14px 9px', borderBottom: '1px solid #E4E0D8' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    color: '#666',
                    fontSize: 12,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="1" y="1" width="11" height="11" rx="2" stroke="#888" strokeWidth="1.2" />
                    <line x1="6.5" y1="4" x2="6.5" y2="9" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="4" y1="6.5" x2="9" y2="6.5" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  New Album
                </div>
              </div>

              {/* Workspace */}
              <div style={{ padding: '8px 8px 4px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '7px 8px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      background: 'linear-gradient(135deg, #21808D 0%, #B87333 100%)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>Joe's Music</span>
                  <span style={{ marginLeft: 'auto', color: '#999', fontSize: 10 }}>▾</span>
                </div>
              </div>

              {/* Nav items */}
              <div style={{ padding: '2px 8px' }}>
                {[
                  { label: 'All Albums', icon: '♪' },
                  { label: 'Playlists', icon: '○' },
                  { label: 'Calendar', icon: '□' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '6px 8px',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      color: i === 0 ? '#21808D' : '#5E5248',
                      borderRadius: 6,
                      fontSize: 12.5,
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    <span style={{ fontSize: 11, width: 14, textAlign: 'center' }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Starred */}
              <div style={{ padding: '8px 16px 3px', color: '#A09890', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
                STARRED
              </div>
              <div style={{ padding: '0 8px' }}>
                {['Journal', 'Ideas'].map((label) => (
                  <div
                    key={label}
                    style={{
                      padding: '5px 8px',
                      color: '#5E5248',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      fontSize: 12.5,
                      borderRadius: 6,
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="1" width="11" height="11" rx="2" stroke="#C8BFB4" strokeWidth="1" />
                    </svg>
                    {label}
                  </div>
                ))}
              </div>

              {/* Folders */}
              <div style={{ padding: '8px 16px 3px', color: '#A09890', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
                FOLDERS
              </div>
              <div style={{ padding: '0 8px' }}>
                {[
                  { label: 'Notes', icon: '▪' },
                  { label: 'Rock', icon: '🌐' },
                  { label: 'Jazz', icon: '🔴' },
                  { label: 'Design Docs', icon: '✏' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '5px 8px',
                      color: '#5E5248',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      fontSize: 12.5,
                      borderRadius: 6,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main Content ── */}
            <div
              style={{
                flex: 1,
                padding: '14px 16px',
                background: '#F8F6F1',
                overflowY: 'auto',
              }}
            >
              {/* Toolbar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#888', fontSize: 14 }}>+</span>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#1a1a1a',
                      fontFamily: 'var(--font-sans), sans-serif',
                    }}
                  >
                    All Albums
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['⊞', '⊟', '☰', '↕'].map((ic) => (
                    <button
                      key={ic}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#999',
                        fontSize: 13,
                        padding: '2px 5px',
                        borderRadius: 4,
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                }}
              >
                {/* Card 1 – Coral/Pink – "Reading list" equivalent */}
                <div
                  style={{
                    background: '#FFCDC4',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    Top Rated
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        background: '#c0392b',
                        borderRadius: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 9, color: 'white' }}>★</span>
                    </div>
                    <span style={{ fontSize: 11.5 }}>The National</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        background: '#27ae60',
                        borderRadius: 5,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 11.5 }}>Radiohead</span>
                  </div>
                  <div style={{ fontSize: 10, color: '#7A5A54', lineHeight: 1.45 }}>
                    best, loved, timeless three artists
                  </div>
                </div>

                {/* Card 2 – White – "Workout routine" equivalent */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                    border: '1px solid #EDEBE6',
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    Listening Queue
                  </div>
                  <div style={{ fontSize: 11, color: '#555', marginBottom: 5 }}>Monday</div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      alignItems: 'center',
                      fontSize: 11,
                      color: '#888',
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        border: '1px solid #C8C4BC',
                        flexShrink: 0,
                      }}
                    />
                    Dark Side of the Moon
                  </div>
                  <div style={{ fontSize: 11, color: '#555', marginBottom: 5, marginTop: 6 }}>
                    Tuesday
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      alignItems: 'center',
                      fontSize: 11,
                      color: '#888',
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        border: '1px solid #C8C4BC',
                        flexShrink: 0,
                      }}
                    />
                    Walk home from office
                  </div>
                </div>

                {/* Card 3 – Yellow-green – "Weekend Trip" equivalent */}
                <div
                  style={{
                    background: '#E6F0C0',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    Concert Plans
                  </div>
                  <div style={{ fontSize: 10, color: '#4A5A2A', lineHeight: 1.6 }}>
                    <strong>Hey music fans,</strong>
                    <br />
                    So excited for our summer festival adventure! Here's our rough plan for the weekend.
                    <br />
                    <br />
                    <strong>Friday Night (Arrival)</strong>
                  </div>
                </div>

                {/* Card 4 – Mint – "Lecture Notes" equivalent */}
                <div
                  style={{
                    background: '#C4E8D0',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    Genre Notes
                  </div>
                  <div style={{ fontSize: 10.5, color: '#2E5040', lineHeight: 1.85 }}>
                    01. Indie Rock
                    <br />
                    02. Jazz Fusion
                    <br />
                    03. Ambient
                    <br />
                    04. Neo-Soul
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: 10, color: '#2E5040', fontWeight: 600 }}>Tracks</div>
                    <div style={{ fontSize: 10, color: '#3A6050' }}>— Notes first 4 albums</div>
                  </div>
                </div>

                {/* Card 5 – Light blue-white – "Museums to visit" equivalent */}
                <div
                  style={{
                    background: '#DCEEF6',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    Venues
                    <br />
                    to visit
                  </div>
                  <div style={{ fontSize: 11, color: '#2A4A5E', lineHeight: 1.7 }}>
                    Blue Note Jazz Club
                    <br />
                    Berghain, Berlin
                    <br />
                    <br />
                    Royal Albert Hall
                  </div>
                </div>

                {/* Card 6 – Lavender – "15 November, 2025" equivalent */}
                <div
                  style={{
                    background: '#E2D4F0',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 128,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                    15 November, 2025
                  </div>
                  <div style={{ fontSize: 10, color: '#4A3A5E', lineHeight: 1.6 }}>
                    My brain naturally syncs with this urban rhythm. Four months in as a rec nerd, six albums felt in a week deep from somewhere in the spiraling post-indie whirlpool. I notice how my emotions have been carrying me...
                  </div>
                </div>
              </div>

              {/* Second row (partially visible) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {/* Card 7 – cream */}
                <div
                  style={{
                    background: '#F8F0E0',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 100,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: '#1a1a1a' }}>
                    16 November, 2025
                  </div>
                  <div style={{ fontSize: 10, color: '#5E4A30', lineHeight: 1.5 }}>
                    This morning I ran twenty laps around the track...
                  </div>
                </div>

                {/* Card 8 – dark navy */}
                <div
                  style={{
                    background: '#28446A',
                    borderRadius: 13,
                    padding: 14,
                    minHeight: 100,
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: 'white' }}>
                    Commute Thoughts
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
                    I think about all the songs I've discovered during rush hour...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
