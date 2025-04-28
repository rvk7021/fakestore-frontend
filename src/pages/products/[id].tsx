// src/pages/products/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

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

const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <div className="h-8 w-32 bg-purple-700/30 rounded-md mb-6 animate-pulse"></div>

            <div className="bg-purple-800 shadow-2xl rounded-xl overflow-hidden border border-purple-600/30">
                <div className="md:flex">
                    <div className="md:w-1/2 p-8 flex items-center justify-center bg-purple-900/50">
                        <div className="w-full h-96 bg-purple-700/30 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="md:w-1/2 p-10">
                        <div className="h-6 w-24 bg-purple-700/40 rounded-full animate-pulse"></div>
                        <div className="mt-4 h-8 w-3/4 bg-purple-700/40 rounded animate-pulse"></div>
                        <div className="mt-4 h-5 w-36 bg-purple-700/40 rounded animate-pulse"></div>

                        <div className="mt-6">
                            <div className="h-4 w-full bg-purple-700/30 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-full bg-purple-700/30 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-3/4 bg-purple-700/30 rounded animate-pulse"></div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="h-8 w-24 bg-purple-700/40 rounded animate-pulse"></div>
                            <div className="h-6 w-20 bg-green-700/30 rounded-full animate-pulse"></div>
                        </div>

                        <div className="mt-6">
                            <div className="h-12 w-36 bg-purple-700/30 rounded-lg animate-pulse mb-6"></div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-orange-500/30 rounded-lg animate-pulse"></div>
                                <div className="h-12 bg-purple-700/40 rounded-lg animate-pulse"></div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-purple-600/30">
                            <div className="flex flex-wrap gap-4">
                                <div className="h-9 w-32 bg-purple-700/30 rounded-lg animate-pulse"></div>
                                <div className="h-9 w-32 bg-purple-700/30 rounded-lg animate-pulse"></div>
                                <div className="h-9 w-32 bg-purple-700/30 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <div className="flex space-x-2">
                    <div className="h-6 w-20 bg-purple-700/40 rounded-md animate-pulse"></div>
                    <div className="h-6 w-28 bg-purple-700/40 rounded-md animate-pulse"></div>
                    <div className="h-6 w-24 bg-purple-700/40 rounded-md animate-pulse"></div>
                </div>

                <div className="flex space-x-3">
                    <div className="h-10 w-28 bg-orange-500/30 rounded-md animate-pulse"></div>
                    <div className="h-10 w-28 bg-purple-700/40 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-purple-900">
                <p className="text-xl font-medium text-purple-200">Product not found</p>
            </div>
        )
    }

    // Generate stars for rating display
    const renderStars = () => {
        const fullStars = Math.floor(product.rating.rate);
        const hasHalfStar = product.rating.rate - fullStars >= 0.5;

        return (
            <div className="flex items-center">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                            {i < fullStars ? (
                                <span className="text-orange-400">★</span>
                            ) : i === fullStars && hasHalfStar ? (
                                <span className="text-orange-400">⭐</span>
                            ) : (
                                <span className="text-purple-300/30">★</span>
                            )}
                        </span>
                    ))}
                </div>
                <span className="ml-2 text-sm text-purple-200">
                    {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                </span>
            </div>
        );
    };

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/products" className="text-purple-200 hover:text-orange-400 flex items-center mb-6 font-medium transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to products
                </Link>

                <div className="bg-purple-800 shadow-2xl rounded-xl overflow-hidden border border-purple-600/30">
                    <div className="md:flex">
                        <div className="md:w-1/2 p-8 flex items-center justify-center bg-purple-900/50">
                            <div className="relative w-full h-96 transition-all duration-500 hover:scale-105">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-6"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="md:w-1/2 p-10">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-700 text-purple-200 uppercase tracking-wide">
                                {product.category}
                            </div>

                            <h1 className="mt-4 text-3xl font-bold text-white leading-tight">{product.title}</h1>

                            <div className="mt-4">
                                {renderStars()}
                            </div>

                            <div className="mt-6">
                                <p className="text-purple-200 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <p className="text-3xl font-bold text-white">${product.price.toFixed(2)}</p>
                                <span className="text-sm text-green-300 font-medium px-3 py-1 bg-green-900/30 rounded-full">In Stock</span>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center border border-purple-600 rounded-lg overflow-hidden bg-purple-700/30">
                                        <button className="px-4 py-2 text-purple-200 hover:bg-purple-700 transition-colors duration-200">-</button>
                                        <span className="px-4 py-2 text-white font-medium border-l border-r border-purple-600">1</span>
                                        <button className="px-4 py-2 text-purple-200 hover:bg-purple-700 transition-colors duration-200">+</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-purple-800 transition-all duration-200 shadow-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <button className="bg-purple-700 text-purple-200 px-6 py-3 rounded-lg font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-800 transition-all duration-200 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        Wishlist
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-purple-600/30">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center text-purple-200 bg-purple-700/30 px-3 py-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1v-3h1a1 1 0 001-1V8a2 2 0 00-2-2h-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v1h-2V7z" />
                                        </svg>
                                        Free shipping
                                    </div>
                                    <div className="flex items-center text-purple-200 bg-purple-700/30 px-3 py-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                        </svg>
                                        30-day returns
                                    </div>
                                    <div className="flex items-center text-purple-200 bg-purple-700/30 px-3 py-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Authentic guarantee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-purple-700 text-purple-200 rounded-md text-sm">React</span>
                        <span className="px-3 py-1 bg-purple-700 text-purple-200 rounded-md text-sm">Tailwind CSS</span>
                        <span className="px-3 py-1 bg-purple-700 text-purple-200 rounded-md text-sm">Next.js</span>
                    </div>

                    <div className="flex space-x-3">
                        <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            Live Demo
                        </a>
                        <a href="#" className="bg-purple-700 hover:bg-purple-600 text-purple-200 px-4 py-2 rounded-md flex items-center justify-center transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
            fallback: 'blocking'
        }
    } catch (error) {
        console.error('Error loading static paths:', error)

        return {
            paths: [],
            fallback: 'blocking'
        }
    }
}

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