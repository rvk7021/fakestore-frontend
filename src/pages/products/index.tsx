import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductsPageProps {
  initialProducts: Product[]
}

const ProductsPage: React.FC<ProductsPageProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      setLoading(true);
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, []); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Listing</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map(product => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`} 
              className="block transform transition duration-300 hover:-translate-y-1"
            >
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-xl font-bold text-indigo-600 mb-1">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
                <div className="flex items-center mt-auto">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.round(product.rating.rate))}
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.rating.count})</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p>No products found</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await res.json();

    return {
      props: {
        initialProducts: products,
      },
      revalidate: 10, // revalidate after 10 sec
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        initialProducts: [],
      },
      revalidate: 5,
    }
  }
}
export default ProductsPage
