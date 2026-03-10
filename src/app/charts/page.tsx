import { Sidebar } from '@/components/layout/Sidebar'
import { ChartsView } from '@/components/views/ChartsView'

export default function ChartsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <ChartsView />
      </main>
    </div>
  )
}
