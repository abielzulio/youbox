import Head from "components/head"
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
  const [showEditable, setShowEditable] = useState<boolean>(false)

  const { user } = useContext(AuthContext)

  const editableHandler = (e: any): void => {
    e.preventDefault()
    setShowEditable((prev) => !prev)
  }

  return (
    <>
      <Head title={localProduct?.product_name} />
      <div className="w-full h-full flex my-[60px]">
        <div className="max-w-[1000px] px-[24px] mx-auto grid lg:grid-cols-2 grid-cols-1">
          <img src={localProduct.product_image_url} />

          <div className="flex flex-col gap-[10px]">
            <p className="opacity-50">{localProduct?.brand}</p>
            <h1 className="text-[24px] font-bold">
              {localProduct?.product_name}
            </h1>
            <div className="flex flex-col gap-[20px]">
              <p className="font-mono text-[24px]">
                Rp{Number(localProduct?.product_price).toLocaleString()}
              </p>
              {localProduct?.product_info === "Stok Habis" && (
                <p className="text-sm text-red-500 bg-red-100 px-[15px] mr-auto py-[3px] rounded-full border-[1px] border-red-500">
                  {product.product_info}
                </p>
              )}
              {(localProduct?.product_info === "Click & Pickup" ||
                localProduct?.product_info === "New") && (
                <p className="text-sm text-blue-500 bg-blue-100 px-[15px] mr-auto py-[3px] rounded-full border-[1px] border-blue-500">
                  {product.product_info}
                </p>
              )}
            </div>
            {showEditable && (
              <EditProduct
                product={localProduct}
                setProduct={setProduct}
                setShowEditable={setShowEditable}
              />
            )}
            {user?.role === "admin" && !showEditable && (
              <button
                onClick={editableHandler}
                className="w-full py-[10px] bg-black text-white mt-[20px]"
              >
                Edit Produk
              </button>
            )}
          </div>
        </div>
      </div>
    </>
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
