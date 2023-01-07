import { Dispatch, SetStateAction, useRef } from "react"
import { Product } from "types/data"

const EditProduct = ({
  product,
  setProduct,
  setShowEditable,
}: {
  product: Product
  setProduct: Dispatch<SetStateAction<Product>>
  setShowEditable: Dispatch<SetStateAction<boolean>>
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const priceInputRef = useRef<HTMLInputElement>(null)
  const availableInputRef = useRef<HTMLSelectElement>(null)

  const updateProductHandler = async (e: any, id: string): Promise<void> => {
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
      await fetch("/api/product/update", {
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
        setShowEditable(false)
        return alert("Produk telah diperbarui")
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form
      className="p-[12px] border-gray-500 border-[1px] rounded-lg flex flex-col gap-[10px]"
      onSubmit={(e) => product?._id && updateProductHandler(e, product._id)}
    >
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="name" className="text-sm">
          Nama Produk
        </label>
        <input
          type="name"
          id="name"
          className="border-[1px] border-black h-[36px] pl-[12px]"
          required
          ref={nameInputRef}
          defaultValue={product?.product_name}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="price" className="text-sm">
          Harga
        </label>
        <input
          type="price"
          id="price"
          required
          className="border-[1px] border-black h-[36px] pl-[12px]"
          ref={priceInputRef}
          defaultValue={product?.product_price}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <label htmlFor="available" className="text-sm">
          Ketersediaan Stok
        </label>
        <select
          name="available"
          id="available"
          className="border-[1px] border-black h-[36px] pl-[12px]"
          defaultValue={product?.product_info}
          ref={availableInputRef}
        >
          <option value="Stok Habis">Stok Habis</option>
          <option value="Click & Pickup">Click & Pickup</option>
          <option value="New">New</option>
        </select>
      </div>
      <div className="mt-[5px]">
        <button className="bg-black text-white py-[10px] w-full rounded-md">
          Simpan Edit
        </button>
      </div>
    </form>
  )
}

export default EditProduct
