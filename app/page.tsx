import { getProducts, getCollections } from '@/lib/cosmic'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import CollectionFilter from '@/components/CollectionFilter'

export const revalidate = 60

export default async function Home() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600">
            Discover our curated collection of quality products
          </p>
        </div>

        <CollectionFilter collections={collections} />
        
        <ProductGrid products={products} />
      </main>
    </div>
  )
}