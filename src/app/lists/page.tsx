import { Sidebar } from '@/components/layout/Sidebar'
import { ListsView } from '@/components/views/ListsView'

export default function ListsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <ListsView />
      </main>
    </div>
  )
}
