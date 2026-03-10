import { Sidebar } from '@/components/layout/Sidebar'
import { ExploreView } from '@/components/views/ExploreView'

export default function ExplorePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <ExploreView />
      </main>
    </div>
  )
}
