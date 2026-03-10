import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MusicNerds - Social Platform for Music Enthusiasts',
  description: 'Rate albums, track listening stats, join communities, and discover new music.',
  keywords: ['music', 'albums', 'ratings', 'social', 'scrobbles'],
  openGraph: {
    title: 'MusicNerds',
    description: 'A social platform for music enthusiasts',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cream-50 dark:bg-charcoal-700 text-slate-900 dark:text-gray-200 antialiased">
        {children}
      </body>
    </html>
  )
}
