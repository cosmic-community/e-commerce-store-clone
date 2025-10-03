import { Product, Collection } from '@/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const images = product.metadata?.product_images || []
  const collection = product.metadata?.collection as Collection | undefined

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        {images.length > 0 ? (
          <>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={`${images[0].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${product.title} - Image ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : product.thumbnail && (
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`${product.thumbnail}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-6">
        {collection && typeof collection === 'object' && (
          <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-blue-50 rounded-full">
            {collection.title}
          </span>
        )}

        <h1 className="text-4xl font-bold text-gray-900">
          {product.title}
        </h1>

        <div className="flex items-baseline space-x-4">
          <span className="text-4xl font-bold text-primary">
            ${product.metadata?.price?.toFixed(2)}
          </span>
          <span className="text-lg text-gray-600">
            SKU: {product.metadata?.sku}
          </span>
        </div>

        <div className="border-t border-b border-gray-200 py-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            product.metadata?.stock_quantity > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.metadata?.stock_quantity > 0 
              ? `${product.metadata.stock_quantity} in stock` 
              : 'Out of stock'}
          </span>
        </div>

        {product.metadata?.description && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: product.metadata.description }}
          />
        )}

        <button className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}