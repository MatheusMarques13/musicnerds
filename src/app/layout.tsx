import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MusicNerds — Social Platform for Music Enthusiasts',
  description: 'Rate albums, track listening stats, join communities, and discover new music.',
  keywords: ['music', 'albums', 'ratings', 'social', 'scrobbles'],
  openGraph: {
    title: 'MusicNerds',
    description: 'A social platform for music enthusiasts',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
