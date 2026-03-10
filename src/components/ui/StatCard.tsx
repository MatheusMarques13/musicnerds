interface StatCardProps {
  label: string
  value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-5 shadow-sm">
      <div className="text-xs font-medium text-slate-500 dark:text-gray-300/70 mb-1">{label}</div>
      <div className="text-2xl font-bold text-teal-500 dark:text-teal-300">{value}</div>
    </div>
  )
}
