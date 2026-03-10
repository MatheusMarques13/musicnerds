import { AlbumDetailView } from '@/components/views/AlbumDetailView'

export default function AlbumPage({ params }: { params: { id: string } }) {
  return <AlbumDetailView albumId={params.id} />
}
