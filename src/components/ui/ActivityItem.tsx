interface ActivityItemProps {
  username: string
  timeAgo: string
  action: string
  albumTitle: string
  albumArtist: string
  albumInitials: string
  rating?: number
}

export function ActivityItem({
  username,
  timeAgo,
  action,
  albumTitle,
  albumArtist,
  albumInitials,
  rating,
}: ActivityItemProps) {
  return (
    <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-4 flex gap-3">
      <div className="w-11 h-11 rounded-full bg-brown-600/12 dark:bg-gray-400/15 flex items-center justify-center font-bold text-teal-500 dark:text-teal-300 shrink-0">
        {username[0].toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-xs text-slate-500 dark:text-gray-300/70">{timeAgo}</span>
        </div>
        <p className="text-sm mb-2">{action}</p>
        <div className="flex gap-3 p-3 bg-brown-600/12 dark:bg-gray-400/15 rounded-lg items-center">
          <div className="w-14 h-14 rounded bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold shrink-0">
            {albumInitials}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{albumTitle}</div>
            <div className="text-xs text-slate-500 dark:text-gray-300/70">{albumArtist}</div>
          </div>
          {rating && (
            <div className="text-amber-500 text-sm">
              {'★'.repeat(Math.floor(rating))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
