// src/pages/products/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Rating = {
  rate: number
  count: number
}

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

interface ProductPageProps {
  product: Product | null
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/products" className="text-indigo-600 hover:text-indigo-800 flex items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to products
        </Link>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
              <div className="relative w-full h-80">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.title}</h1>

              <div className="mt-4 flex items-center">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.round(product.rating.rate))}
                  {'☆'.repeat(5 - Math.round(product.rating.rate))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="mt-8">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ✅ Fixed getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    const products: Product[] = await res.json()

    const paths = products.map((product) => ({
      params: { id: product.id.toString() }
    }))

    return {
      paths,
      fallback: 'blocking' // Allow generating pages at runtime
    }
  } catch (error) {
    console.error('Error loading static paths:', error)

    // Return empty paths but allow blocking fallback
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

// ✅ Improved getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true }
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)

    if (!res.ok) {
      throw new Error('Product not found')
    }

    const product: Product = await res.json()

    return {
      props: { product },
      revalidate: 60 
    }
  } catch (error) {
    console.error('Error fetching product:', error)

    return { notFound: true }
  }
}

export default ProductPage
