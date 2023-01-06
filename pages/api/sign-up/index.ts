import User from "model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, name } = req.body
  try {
    dbConnect()

    const count = await User.countDocuments({ email })

    if (count > 0)
      return res.status(409).json({ message: "E-mail telah digunakan" })

    if (count === 0) {
      const user = await User.create({ email, password, name })
      if (user) return res.status(200).json({ message: "Akun telah dibuat" })
      if (!user)
        return res.status(500).json({ message: "Terdapat error di server" })
    }
  } catch (error) {
    return res.status(400).json({ message: "Akun tidak dapat dibuat", error })
  }
}
