import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Review, Collection } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Helper to check if error has status
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all products with collections
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products'
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'products',
      slug
    }).depth(1);
    
    const product = response.object as Product;
    
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

// Fetch reviews for a product
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'collections'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

// Fetch products by collection
export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.collection': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by collection');
  }
}