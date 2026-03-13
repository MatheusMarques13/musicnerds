interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-2.5 transition-all"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p
        className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </p>
      <p className="font-serif text-3xl font-bold leading-none" style={{ color: 'var(--text)' }}>
        {value}
      </p>
      {icon && <div style={{ color: 'var(--accent)' }}>{icon}</div>}
    </div>
  )
}
