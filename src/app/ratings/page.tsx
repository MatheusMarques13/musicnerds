import { Sidebar } from '@/components/layout/Sidebar'
import { RatingsView } from '@/components/views/RatingsView'

export default function RatingsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <RatingsView />
      </main>
    </div>
  )
}
