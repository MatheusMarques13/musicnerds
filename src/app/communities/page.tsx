import { Sidebar } from '@/components/layout/Sidebar'
import { CommunitiesView } from '@/components/views/CommunitiesView'

export default function CommunitiesPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <CommunitiesView />
      </main>
    </div>
  )
}
