'use client'

import { Collection } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CollectionFilterProps {
  collections: Collection[]
}

export default function CollectionFilter({ collections }: CollectionFilterProps) {
  const pathname = usePathname()

  if (!collections || collections.length === 0) {
    return null
  }

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
          pathname === '/' 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </Link>
      
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/collections/${collection.slug}`}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            pathname === `/collections/${collection.slug}` 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {collection.title}
        </Link>
      ))}
    </div>
  )
}