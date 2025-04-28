import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Product = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

interface ProductDetailPageProps {
  product: Product | null
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div className="text-center mt-20">Loading...</div>
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/products" className="text-blue-600 underline mt-4 block">
          Go back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <div className="relative w-full h-96 mb-8">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-green-600 font-semibold mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <p className="text-gray-700">{product.description}</p>

        <Link href="/products" className="inline-block mt-8 text-blue-600 underline">
          ← Back to Products
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const products: Product[] = await res.json()

    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }))

    return {
      paths,
      fallback: true, // 👈 Allow building pages on-demand if not pre-generated
    }
  } catch (error) {
    console.error('Error fetching products in getStaticPaths', error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!res.ok) {
      return {
        notFound: true,
      }
    }
    const product: Product = await res.json()

    return {
      props: {
        product,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching single product', error)
    return {
      props: {
        product: null,
      },
    }
  }
}

export default ProductDetailPage
