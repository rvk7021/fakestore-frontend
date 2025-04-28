// src/pages/products/index.tsx
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type Product = {
    id: number
    title: string
    price: number
    category: string
    image: string
}

interface ProductsPageProps {
    products: Product[]
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-8 text-center">Product Listing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                        <div className="relative w-full h-48 mb-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products')
        const products: Product[] = await res.json()

        return {
            props: {
                products,
            },
            revalidate: 60,
        }
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return {
            props: {
                products: [],
            },
        }
    }
}

export default ProductsPage
