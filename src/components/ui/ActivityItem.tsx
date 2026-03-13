import { Star } from 'lucide-react'

interface ActivityItemProps {
  username: string
  timeAgo: string
  action: string
  albumTitle: string
  albumArtist: string
  albumInitials: string
  rating?: number
}

const AVATAR_COLORS = [
  { bg: '#FFCDC4', text: '#8a2010' },
  { bg: '#C4E8D0', text: '#0D4A20' },
  { bg: '#DCEEF6', text: '#0D3A58' },
  { bg: '#E2D4F0', text: '#3A1860' },
  { bg: '#E6F0C0', text: '#304A0A' },
]

function pickColor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
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
  const avatarColor = pickColor(username)
  const albumColor = pickColor(albumTitle)

  return (
    <div
      className="rounded-2xl p-4 flex gap-3 border transition-all"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
        style={{ background: avatarColor.bg, color: avatarColor.text }}
      >
        {username[0].toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
            {username}
          </span>
          <span className="text-[11px] shrink-0" style={{ color: 'var(--muted)' }}>
            {timeAgo}
          </span>
        </div>

        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
          {action}
        </p>

        {/* Album reference tile */}
        <div
          className="flex gap-3 p-3 rounded-xl items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
            style={{ background: albumColor.bg, color: albumColor.text }}
          >
            {albumInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
              {albumTitle}
            </p>
            <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--muted)' }}>
              {albumArtist}
            </p>
          </div>
          {rating && (
            <div className="flex items-center gap-0.5 shrink-0">
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <Star key={i} size={11} style={{ color: 'var(--accent-warm)' }} fill="var(--accent-warm)" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
