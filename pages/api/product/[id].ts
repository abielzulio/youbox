import clientPromise from "lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const client = await clientPromise
    const db = client.db("main")

    const product = await db.collection("product").findOne({ id })

    res.json(product)
  } catch (e) {
    console.error(e)
  }
}
