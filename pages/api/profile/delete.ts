import User from "model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  try {
    dbConnect()

    const user = await User.deleteOne({ _id: new ObjectId(id) })
    if (user) return res.status(200).json({ message: "Akun telah dihapus" })
    if (!user)
      return res.status(500).json({ message: "Terdapat error di server" })
  } catch (error) {
    return res.status(400).json({ message: "Akun tidak dapat dihapus", error })
  }
}
