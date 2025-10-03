# E-Commerce Store

![App Preview](https://imgix.cosmicjs.com/24652250-a09e-11f0-bba7-d56988718db7-photo-1498049794561-7780e7231661-1759526152156.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully-functional e-commerce store built with Next.js 15 and powered by Cosmic CMS. Browse products by collection, view detailed product pages with image galleries, and read customer reviews.

## Features

- 🛍️ Product catalog with collection filtering
- 🔍 Search functionality for finding products
- 📸 Product image galleries with multiple photos
- ⭐ Customer review system with star ratings
- 🏷️ Collection-based product organization
- 📱 Fully responsive design for all devices
- 🎨 Modern, clean UI with smooth animations
- 🚀 Server-side rendering for optimal performance

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e03cb8260d9dd939d1b9b3&clone_repository=68e03db0260d9dd939d1b9d1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI component library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket with your content

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Products with Collections

```typescript
const response = await cosmic.objects
  .find({
    type: 'products'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);

const products = response.objects;
```

### Fetching a Single Product with Reviews

```typescript
const product = await cosmic.objects
  .findOne({
    type: 'products',
    slug: productSlug
  })
  .depth(1);

const reviews = await cosmic.objects
  .find({
    type: 'reviews',
    'metadata.product': product.id
  })
  .depth(1);
```

### Fetching Collections

```typescript
const collections = await cosmic.objects
  .find({
    type: 'collections'
  })
  .props(['id', 'title', 'slug', 'metadata']);
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

- **Products** - Main product catalog with pricing, images, and descriptions
- **Collections** - Product categories (Electronics, Home & Living)
- **Reviews** - Customer reviews with ratings and verification status

All content is fetched dynamically from your Cosmic bucket using the Cosmic SDK v1.5+.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub repository
3. Add your environment variables in Netlify's dashboard
4. Deploy!

<!-- README_END -->