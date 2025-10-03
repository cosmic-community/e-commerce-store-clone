import Link from 'next/link'
import { Product, Collection } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata?.product_images?.[0]?.imgix_url || product.thumbnail
  const collection = product.metadata?.collection as Collection | undefined

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {imageUrl && (
          <div className="relative h-64 bg-gray-100">
            <img
              src={`${imageUrl}?w=600&h=512&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          {collection && typeof collection === 'object' && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-blue-50 rounded-full mb-2">
              {collection.title}
            </span>
          )}
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-primary">
              ${product.metadata?.price?.toFixed(2)}
            </span>
            
            <span className="text-sm text-gray-600">
              {product.metadata?.stock_quantity > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}