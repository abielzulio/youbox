import User from "lib/model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  try {
    dbConnect()

    const user = await User.create({ email, password })

    if (user) return res.status(201).json({ message: "Akun telah dibuat!" })

    if (!user)
      return res.status(500).json({ message: "Terdapat error di server!" })
  } catch (error) {
    return res.status(400).json({ message: "Akun tidak dapat dibuat", error })
  }
}
