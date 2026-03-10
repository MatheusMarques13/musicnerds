import { Sidebar } from '@/components/layout/Sidebar'
import { FeedView } from '@/components/views/FeedView'

export default function FeedPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <FeedView />
      </main>
    </div>
  )
}
