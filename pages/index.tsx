import { Auth } from "components/auth"
import Profile from "components/profile"
import AuthContext from "context/auth"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { Product } from "types/data"

const HomePage: React.FC<{
  products: Product[]
  page: number
  totalPages: number
}> = ({ products, page, totalPages }) => {
  const { user } = useContext(AuthContext)

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

  const startPageHandler = (): void => {
    router.push({
      query: { page: 1 },
    })
  }

  const endPageHandler = (): void => {
    router.push({
      query: { page: totalPages },
    })
  }

  return (
    <>
      <div>
        {products &&
          products.map((product) => (
            <Link key={product._id} href={`/product/${product.id}`}>
              <p>{product.product_name}</p>
            </Link>
          ))}
        {page === totalPages && (
          <button onClick={startPageHandler}>Awal</button>
        )}
        {page > 1 && <button onClick={prevPageHandler}>Previous</button>}
        {page < totalPages && <button onClick={nextPageHandler}>Next</button>}
        {page === 1 && <button onClick={endPageHandler}>Akhir</button>}
        <Auth />
        {user?.role === "user" && <Profile />}
        {user?.role === "admin" && <div>admin</div>}
      </div>
    </>
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
