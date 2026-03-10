'use client'

interface HeaderProps {
  title: string
  username?: string
}

export function Header({ title, username = 'mathmarques' }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-200">{title}</h1>
      <div className="flex items-center gap-3 px-4 py-2 bg-cream-100 dark:bg-charcoal-800 rounded-full border border-brown-600/20 dark:border-gray-400/30">
        <div className="w-9 h-9 rounded-full bg-teal-500 dark:bg-teal-300 flex items-center justify-center text-cream-50 dark:text-slate-900 font-bold text-sm">
          {username[0].toUpperCase()}
        </div>
        <span className="text-sm text-slate-900 dark:text-gray-200">@{username}</span>
      </div>
    </div>
  )
}
