import { Dispatch, SetStateAction, useRef } from "react"
import { Product } from "types/data"

const EditProduct = ({
  product,
  setProduct,
}: {
  product: Product
  setProduct: Dispatch<SetStateAction<Product>>
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const priceInputRef = useRef<HTMLInputElement>(null)
  const availableInputRef = useRef<HTMLInputElement>(null)
  const updateProductHandler = async (e: any, id: string) => {
    e.preventDefault()

    const name = nameInputRef?.current?.value
    const price = priceInputRef?.current?.value
    const available = availableInputRef?.current?.value

    if (!name) return alert("Nama perlu diisi!")
    if (!price) return alert("Harga perlu diisi!")
    if (!available) return alert("Opsi ketersediaan perlu diisi!")

    const _new = { id, name, price, available }

    const body = JSON.stringify(_new)

    try {
      const res = await fetch("/api/product/update", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setProduct({
          ...product,
          product_name: name,
          product_price: price,
          product_info: available,
        } as Product)
        return alert("Produk telah diperbarui")
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form
      onSubmit={(e) => product?._id && updateProductHandler(e, product._id)}
    >
      <div>
        <label htmlFor="name">Nama Produk</label>
        <input
          type="name"
          id="name"
          required
          ref={nameInputRef}
          defaultValue={product?.product_name}
        />
      </div>
      <div>
        <label htmlFor="price">Harga</label>
        <input
          type="price"
          id="price"
          required
          ref={priceInputRef}
          defaultValue={product?.product_price}
        />
      </div>
      <div>
        <label htmlFor="available">Ketersediaan Stok</label>
        <select
          name="available"
          id="available"
          defaultValue={product?.product_info}
          ref={availableInputRef}
        >
          <option value="Stok Habis">Stok Habis</option>
          <option value="Click & Pickup">Click & Pickup</option>
        </select>
      </div>
      <div>
        <button>Ubah</button>
      </div>
    </form>
  )
}

export default EditProduct
