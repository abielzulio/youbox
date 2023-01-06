import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Product } from "types/data"

const HomePage: React.FC<{
  products: Product[]
  page: number
  totalPages: number
}> = ({ products, page, totalPages }) => {
  const router = useRouter()

  const prevPageHandler = (): void => {
    router.push({
      query: { page: page - 1 },
    })
  }

  const nextPageHandler = (): void => {
    router.push({
      query: { page: page + 1 },
    })
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex md:h-[600px] h-[300px] bg-black">
        <h1 className="md:text-[54px] px-[24px] text-[36px] font-medium text-center max-w-[1000px] m-auto text-white">
          Produk gawai dan aksesoris terbaik, untukmu
        </h1>
      </div>
      <div className="p-[24px] max-w-[1000px] mx-auto md:-mt-[120px] -mt-[50px]">
        {products && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.id}`}
                title={product.product_name}
              >
                <div className="h-full flex flex-col gap-[10px] border-[1px] border-gray-300 p-[24px] rounded-lg transition shadow-dark-200 shadow-lg bg-white">
                  <img
                    style={{
                      opacity: product.product_info === "Stok Habis" ? 0.2 : 1,
                    }}
                    src={product.product_image_url}
                  />
                  <h2 className="text-md font-semibold">
                    {product.product_name}
                  </h2>
                  <p className="font-mono font-bold">
                    Rp{Number(product.product_price).toLocaleString()}
                  </p>
                  {product.product_info === "Stok Habis" && (
                    <p className="text-sm text-red-500 bg-red-100 px-[15px] mr-auto py-[3px] rounded-full border-[1px] border-red-500">
                      {product.product_info}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-[10px] w-full mt-[40px] mb-[100px]">
          <button
            style={{ opacity: page > 1 ? 1 : 0.3 }}
            disabled={page === 1}
            className="bg-black px-[10px] py-[5px] mx-auto text-white"
            onClick={prevPageHandler}
          >
            ←
          </button>
          <p className="text-center">
            Halaman {page} dari {totalPages.toLocaleString()}
          </p>
          <button
            style={{ opacity: page < totalPages ? 1 : 0.3 }}
            disabled={page === totalPages}
            className="bg-black px-[10px] py-[5px] mx-auto text-white"
            onClick={nextPageHandler}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<{
  products: Product[]
  page: number
  totalPages: number
}> = async (context) => {
  const { page = 1 } = context.query
  const res = await fetch(`http://localhost:3000/api/product?page=${page}`)
  const data: { products: Product[]; pages: number } = await res.json()
  return {
    props: {
      products: data.products,
      page: Number(page),
      totalPages: data.pages,
    },
  }
}
