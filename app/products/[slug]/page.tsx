// app/products/[slug]/page.tsx
import { getProductBySlug, getProductReviews } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProductDetail from '@/components/ProductDetail'
import ReviewList from '@/components/ReviewList'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getProductReviews(product.id)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetail product={product} />
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          <ReviewList reviews={reviews} />
        </div>
      </main>
    </div>
  )
}