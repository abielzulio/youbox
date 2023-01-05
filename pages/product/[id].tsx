import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Product } from "types/data"

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product>()

  const fetchProduct = async (id: string | string[] | undefined) => {
    const res = await fetch(`/api/product/${id}`)
    const data = await res.json()
    setProduct(data)
  }

  useEffect(() => {
    fetchProduct(id)
  }, [id])

  return (
    <div>
      {product ? (
        <>
          <h1>{product.product_name}</h1>
          <p>Price: {product.product_price}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductPage
