import User from "model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, email, password, name } = req.body
  try {
    dbConnect()

    const update = {
      $set: {
        email,
        password,
        name,
      },
    }

    const user = await User.updateOne({ _id: new ObjectId(id) }, update)
    if (user) return res.status(200).json({ message: "Akun telah diperbarui" })
    if (!user)
      return res.status(500).json({ message: "Terdapat error di server" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Akun tidak dapat diperbarui", error })
  }
}
