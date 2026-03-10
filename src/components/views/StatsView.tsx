import { Header } from '@/components/layout/Header'
import { StatCard } from '@/components/ui/StatCard'

const topArtists = [
  { name: 'Taylor Swift', scrobbles: 2847 },
  { name: 'Kendrick Lamar', scrobbles: 1923 },
  { name: 'Frank Ocean', scrobbles: 1456 },
  { name: 'Radiohead', scrobbles: 1201 },
  { name: 'Daft Punk', scrobbles: 987 },
]

const topAlbums = [
  { title: 'folklore', artist: 'Taylor Swift', scrobbles: 634 },
  { title: 'Blonde', artist: 'Frank Ocean', scrobbles: 521 },
  { title: 'In Rainbows', artist: 'Radiohead', scrobbles: 498 },
  { title: 'DAMN.', artist: 'Kendrick Lamar', scrobbles: 445 },
  { title: 'Random Access Memories', artist: 'Daft Punk', scrobbles: 389 },
]

const topGenres = [
  { genre: 'Pop', percent: 34 },
  { genre: 'Hip-Hop', percent: 26 },
  { genre: 'Indie', percent: 18 },
  { genre: 'Electronic', percent: 14 },
  { genre: 'Jazz', percent: 8 },
]

export function StatsView() {
  return (
    <>
      <Header title="Your Stats" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Scrobbles" value="12,847" />
        <StatCard label="Albums Rated" value="326" />
        <StatCard label="Artists Followed" value="89" />
        <StatCard label="Listening Days" value="847" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-5">
          <h3 className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-300/70 mb-4 tracking-wide">Top Artists</h3>
          {topArtists.map((a, i) => (
            <div key={a.name} className="flex items-center gap-3 py-2">
              <span className="text-sm font-bold text-slate-400 w-5">{i + 1}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{a.name}</div>
                <div className="text-xs text-slate-500">{a.scrobbles.toLocaleString()} scrobbles</div>
              </div>
              <div className="h-2 bg-teal-500/20 rounded-full w-24 overflow-hidden">
                <div
                  className="h-full bg-teal-500 dark:bg-teal-300 rounded-full"
                  style={{ width: `${(a.scrobbles / topArtists[0].scrobbles) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-5">
          <h3 className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-300/70 mb-4 tracking-wide">Top Albums</h3>
          {topAlbums.map((a, i) => (
            <div key={a.title} className="flex items-center gap-3 py-2">
              <span className="text-sm font-bold text-slate-400 w-5">{i + 1}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">{a.title}</div>
                <div className="text-xs text-slate-500">{a.artist} • {a.scrobbles.toLocaleString()} scrobbles</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-5">
        <h3 className="text-xs font-semibold uppercase text-slate-500 dark:text-gray-300/70 mb-4 tracking-wide">Top Genres</h3>
        <div className="flex flex-col gap-3">
          {topGenres.map((g) => (
            <div key={g.genre} className="flex items-center gap-3">
              <span className="text-sm font-medium w-20">{g.genre}</span>
              <div className="flex-1 h-3 bg-teal-500/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 dark:bg-teal-300 rounded-full transition-all"
                  style={{ width: `${g.percent}%` }}
                />
              </div>
              <span className="text-sm font-semibold w-10 text-right">{g.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
