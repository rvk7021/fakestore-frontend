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

const ProductSkeleton = () => (
    <div className="bg-purple-800 rounded-xl overflow-hidden shadow-lg border border-purple-600/30 h-full flex flex-col">
        <div className="bg-purple-900/50 p-6 flex items-center justify-center h-56 relative">
            <div className="w-3/4 h-28 bg-purple-700/40 animate-pulse rounded"></div>
            <div className="absolute top-4 right-4">
                <span className="bg-purple-700/40 animate-pulse text-transparent text-xs px-8 py-1 rounded-full">
                    &nbsp;
                </span>
            </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
            <div className="h-5 bg-purple-700/40 animate-pulse rounded mb-2"></div>
            <div className="h-5 bg-purple-700/40 animate-pulse rounded w-3/4 mb-4"></div>
            <div className="flex items-center mb-4">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-purple-700/40 animate-pulse rounded-full mr-1"></div>
                    ))}
                </div>
                <div className="ml-2 w-10 h-4 bg-purple-700/40 animate-pulse rounded"></div>
            </div>
            <div className="mt-auto flex items-center justify-between">
                <div className="w-16 h-7 bg-purple-700/40 animate-pulse rounded"></div>
                <div className="w-8 h-8 bg-purple-700/40 animate-pulse rounded-full"></div>
            </div>
        </div>
    </div>
);

const SkeletonFilter = () => (
    <div className="bg-purple-800 rounded-xl p-6 mb-8 shadow-lg border border-purple-600/30">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-grow">
                <div className="h-10 bg-purple-700/40 animate-pulse rounded-lg w-full"></div>
            </div>
            <div className="relative md:w-1/4">
                <div className="h-10 bg-purple-700/40 animate-pulse rounded-lg w-full"></div>
            </div>
            <div className="relative md:w-1/4">
                <div className="h-10 bg-purple-700/40 animate-pulse rounded-lg w-full"></div>
            </div>
        </div>

        <div className="mt-6">
            <div className="h-5 bg-purple-700/40 animate-pulse rounded w-1/4 mb-2"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-2 bg-purple-700/40 animate-pulse rounded-lg w-full"></div>
                <div className="h-2 bg-purple-700/40 animate-pulse rounded-lg w-full"></div>
            </div>
        </div>

        <div className="mt-6 flex justify-end">
            <div className="h-10 bg-purple-700/40 animate-pulse rounded-lg w-32"></div>
        </div>
    </div>
);

const ProductsPage: React.FC<ProductsPageProps> = ({ initialProducts }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [sortOption, setSortOption] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Get unique categories from products
    const categories = [...new Set(initialProducts.map(product => product.category))];

    useEffect(() => {
        if (!initialProducts || initialProducts.length === 0) {
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setFilteredProducts(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                });
        } else {
            // Simulate loading delay
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [initialProducts]);

    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }

        result = result.filter(product =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        if (sortOption === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating-desc') {
            result.sort((a, b) => b.rating.rate - a.rating.rate);
        } else if (sortOption === 'popularity') {
            result.sort((a, b) => b.rating.count - a.rating.count);
        }

        setFilteredProducts(result);
        // Reset to first page when filters change
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange, sortOption, products]);

    const maxPrice = Math.ceil(
        Math.max(...products.map(product => product.price))
    );

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        return (
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
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setPriceRange({ min: 0, max: maxPrice });
        setSortOption('');
    };

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-3 text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-300">Discover Premium Collection</h1>
                <p className="text-center text-purple-200 mb-8 text-lg">Explore our hand-picked catalog of exceptional products</p>

                {/* Search and filters */}
                {loading ? (
                    <SkeletonFilter />
                ) : (
                    <div className="bg-purple-800 rounded-xl p-6 mb-8 shadow-lg border border-purple-600/30">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                            {/* Search bar */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2 w-full bg-purple-700 text-white placeholder-purple-300 rounded-lg border border-purple-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Category filter */}
                            <div className="relative md:w-1/4">
                                <select
                                    className="w-full bg-purple-700 text-white rounded-lg py-2 px-4 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Sort filter */}
                            <div className="relative md:w-1/4">
                                <select
                                    className="w-full bg-purple-700 text-white rounded-lg py-2 px-4 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="">Sort By</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating-desc">Best Rated</option>
                                    <option value="popularity">Most Popular</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Price range slider */}
                        <div className="mt-6">
                            <label className="block text-purple-200 text-sm font-medium mb-2">
                                Price Range: ${priceRange.min.toFixed(0)} - ${priceRange.max.toFixed(0)}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                    className="range-slider w-full h-2 bg-purple-600 rounded-lg appearance-none cursor-pointer"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    className="range-slider w-full h-2 bg-purple-600 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Clear filters button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Product count and pagination info */}
                {!loading && (
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
                        <div className="text-purple-200 mb-3 sm:mb-0">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                            {filteredProducts.length > 0 && (
                                <span> - Showing page {currentPage} of {totalPages}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Product grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {currentProducts.map(product => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="block group"
                                >
                                    <div className="bg-purple-800 rounded-xl overflow-hidden shadow-lg border border-purple-600/30 h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-orange-400/20 hover:shadow-xl">
                                        <div className="bg-purple-900/50 p-6 flex items-center justify-center h-56 relative">
                                            <div className="w-full h-40 relative transition-transform duration-300 group-hover:scale-110">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-purple-700 text-purple-200 text-xs px-2 py-1 rounded-full capitalize">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h2 className="text-lg font-semibold mb-2 text-white line-clamp-2 h-14">
                                                {product.title}
                                            </h2>
                                            <div className="flex items-center mb-4">
                                                {renderStars(product.rating.rate)}
                                                <span className="ml-2 text-sm text-purple-300">
                                                    ({product.rating.count})
                                                </span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-2xl font-bold text-orange-400">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                                <button className="bg-purple-700 hover:bg-purple-600 text-purple-200 p-2 rounded-full transition-colors duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={goToPrevPage}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${currentPage === 1
                                                ? 'border-purple-600 bg-purple-800/50 text-purple-400 cursor-not-allowed'
                                                : 'border-purple-600 bg-purple-800 text-purple-200 hover:bg-purple-700'
                                            } text-sm font-medium`}
                                    >
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Previous</span>
                                    </button>

                                    {/* Dynamic page numbers */}
                                    {[...Array(totalPages)].map((_, i) => {
                                        const pageNumber = i + 1;
                                        // Show limited page numbers for better UI when many pages exist
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => paginate(pageNumber)}
                                                    aria-current={currentPage === pageNumber ? "page" : undefined}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber
                                                            ? 'z-10 bg-orange-500 border-orange-500 text-white'
                                                            : 'bg-purple-800 border-purple-600 text-purple-200 hover:bg-purple-700'
                                                        }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        } else if (
                                            (pageNumber === currentPage - 2 && currentPage > 3) ||
                                            (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                                        ) {
                                            // Show ellipsis for skipped pages
                                            return (
                                                <span
                                                    key={pageNumber}
                                                    className="relative inline-flex items-center px-4 py-2 border border-purple-600 bg-purple-800 text-purple-400"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${currentPage === totalPages
                                                ? 'border-purple-600 bg-purple-800/50 text-purple-400 cursor-not-allowed'
                                                : 'border-purple-600 bg-purple-800 text-purple-200 hover:bg-purple-700'
                                            } text-sm font-medium`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-purple-800 rounded-xl p-12 text-center shadow-lg border border-purple-600/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                        <p className="text-purple-300 mb-6">Try adjusting your filters or search terms</p>
                        <button
                            onClick={clearFilters}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            Clear All Filters
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
            revalidate: 60,
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                initialProducts: [],
            },
            revalidate: 30,
        }
    }
}

export default ProductsPage