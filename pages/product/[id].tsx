import EditProduct from "components/product/edit"
import AuthContext from "context/auth"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { Product } from "types/data"

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter()
  const { id } = router.query
  const [localProduct, setProduct] = useState<Product>(product)
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const { user } = useContext(AuthContext)

  const editableHandler = (e: any): void => {
    e.preventDefault()
    setIsEditable((prev) => !prev)
  }

  return (
    <div>
      {user?.role === "admin" && (
        <button onClick={editableHandler}>
          {isEditable ? "selesai edit" : "edit product"}
        </button>
      )}
      {isEditable && (
        <EditProduct product={localProduct} setProduct={setProduct} />
      )}
      <h1>{localProduct?.product_name}</h1>
      <p>Price: {localProduct?.product_price}</p>
      <p>Stok: {localProduct?.product_info}</p>
    </div>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps<{
  product: Product
}> = async (context) => {
  const { id } = context.params
  const res = await fetch(`http://localhost:3000/api/product/${id}`)
  const product: Product = await res.json()
  return {
    props: { product },
  }
}
