// app/collections/[slug]/page.tsx
import { getCollections, getProductsByCollection } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collections = await getCollections()
  const collection = collections.find(c => c.slug === slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {collection.title}
          </h1>
          {collection.metadata?.description && (
            <p className="text-xl text-gray-600">
              {collection.metadata.description}
            </p>
          )}
        </div>
        
        <ProductGrid products={products} />
      </main>
    </div>
  )
}