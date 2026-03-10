import { Sidebar } from '@/components/layout/Sidebar'
import { CollectionView } from '@/components/views/CollectionView'

export default function CollectionPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <CollectionView />
      </main>
    </div>
  )
}
