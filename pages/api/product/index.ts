import clientPromise from "lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const PAGE_SIZE = 20

  const page = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || PAGE_SIZE

  const skip = (page - 1) * pageSize
  const limit = pageSize

  try {
    const client = await clientPromise
    const db = client.db("main")

    const totalPages = Math.ceil(
      (await db.collection("product").countDocuments()) / PAGE_SIZE
    )

    const product = await db
      .collection("product")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray()

    if (product && totalPages)
      return res.status(200).json({ pages: totalPages, products: product })

    if (!product)
      return res.status(500).json({ message: "Terdapat error di server!" })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}
