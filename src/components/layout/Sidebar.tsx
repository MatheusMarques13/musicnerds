'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Search, BarChart2, Newspaper, Users, List, TrendingUp, Disc, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const navSections = [
  {
    title: 'Discover',
    items: [
      { label: 'Home', icon: Home, href: '/' },
      { label: 'Explore', icon: Search, href: '/explore' },
      { label: 'Charts', icon: BarChart2, href: '/charts' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'Activity Feed', icon: Newspaper, href: '/feed' },
      { label: 'Communities', icon: Users, href: '/communities' },
      { label: 'Collaborative Lists', icon: List, href: '/lists' },
    ],
  },
  {
    title: 'Your Music',
    items: [
      { label: 'Your Stats', icon: TrendingUp, href: '/stats' },
      { label: 'Collection', icon: Disc, href: '/collection' },
      { label: 'Your Ratings', icon: Star, href: '/ratings' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-cream-100 dark:bg-charcoal-800 border-r border-brown-600/20 dark:border-gray-400/30 p-5 flex flex-col gap-6 overflow-y-auto shrink-0">
      <div className="text-xl font-bold text-teal-500 dark:text-teal-300 mb-2">
        🎵 MusicNerds
      </div>

      {navSections.map((section) => (
        <nav key={section.title} className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-300/70 mb-2 tracking-wide">
            {section.title}
          </h3>
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                  isActive
                    ? 'bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 font-medium'
                    : 'text-slate-900 dark:text-gray-200 hover:bg-brown-600/12 dark:hover:bg-gray-400/15'
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      ))}
    </aside>
  )
}
