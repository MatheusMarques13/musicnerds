import { Header } from '@/components/layout/Header'
import { Star } from 'lucide-react'

const ratings = [
  { title: 'folklore', artist: 'Taylor Swift', rating: 5.0, initials: 'FL', review: 'A masterpiece of intimacy and storytelling. Every track is perfect.' },
  { title: 'Blonde', artist: 'Frank Ocean', rating: 5.0, initials: 'BL', review: 'Emotionally devastatingly beautiful. A generational album.' },
  { title: 'GNX', artist: 'Kendrick Lamar', rating: 4.7, initials: 'GN', review: 'Lamar at his most focused and brutal. A statement album.' },
  { title: 'Brat', artist: 'Charli XCX', rating: 4.6, initials: 'BR', review: 'The sound of the summer, perfectly executed.' },
  { title: 'In Rainbows', artist: 'Radiohead', rating: 4.9, initials: 'IR', review: 'Radiohead\'s most accessible album without sacrificing depth.' },
  { title: 'Short n\' Sweet', artist: 'Sabrina Carpenter', rating: 4.2, initials: 'SC', review: 'Incredibly fun pop. Tight runtime, no filler.' },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-amber-500"
          fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

export function RatingsView() {
  return (
    <>
      <Header title="Your Ratings" />

      <div className="flex flex-col gap-4">
        {ratings.map((r) => (
          <div key={r.title} className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-4 flex gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold shrink-0">
              {r.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-300/70">{r.artist}</p>
                </div>
                <div className="flex items-center gap-1">
                  <StarRow rating={r.rating} />
                  <span className="text-sm font-bold ml-1">{r.rating.toFixed(1)}</span>
                </div>
              </div>
              {r.review && (
                <p className="text-sm text-slate-600 dark:text-gray-300/80 italic mt-2">"{r.review}"</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
