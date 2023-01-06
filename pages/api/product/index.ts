import clientPromise from "lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 11

  const skip = (page - 1) * pageSize
  const limit = pageSize

  const search = req.query.search

  const filter = {
    $text: {
      $search: search,
    },
  }

  try {
    const client = await clientPromise
    const db = client.db("main")

    if (search)
      return await db
        .collection("product")
        .createIndex({ product_name: "text" })

    const product = await db
      .collection("product")
      .find(search ? filter : {})
      .skip(skip)
      .limit(limit)
      .toArray()

    if (product) return res.status(200).json(product)

    if (!product)
      return res.status(500).json({ message: "Terdapat error di server!" })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}
