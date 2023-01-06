import User from "model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "lib/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, price, available } = req.body
  try {
    const client = await clientPromise
    const db = client.db("main")

    const update = {
      $set: {
        product_name: name,
        product_price: price,
        product_info: available,
      },
    }

    const product = await db
      .collection("product")
      .updateOne({ _id: new ObjectId(id) }, update)
    if (product)
      return res.status(200).json({ message: "Produk telah diperbarui" })
    if (!product)
      return res.status(500).json({ message: "Terdapat error di server" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Produk tidak dapat diperbarui", error })
  }
}
