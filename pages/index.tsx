import { useEffect, useState } from "react"
import { Product } from "types/data"

const HomePage = () => {
  const [allProduct, setAllProduct] = useState<Product[]>([])

  const fetchAllProduct = async () => {
    const res = await fetch("/api/product")
    const data = await res.json()
    setAllProduct(data)
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      {allProduct ? (
        allProduct.map((item) => (
          <a key={item.id} href={`/product/${item.id}`}>
            <p>{item.product_name}</p>
          </a>
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}

export default HomePage
