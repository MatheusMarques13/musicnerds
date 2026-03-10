import { Sidebar } from '@/components/layout/Sidebar'
import { StatsView } from '@/components/views/StatsView'

export default function StatsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <StatsView />
      </main>
    </div>
  )
}
