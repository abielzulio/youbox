import clientPromise from "lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const client = await clientPromise
    const db = client.db("main")

    const product = await db.collection("product").findOne({ id })

    if (product) return res.status(200).json(product)

    if (!product)
      return res.status(500).json({ message: "Terdapat error di server!" })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}
