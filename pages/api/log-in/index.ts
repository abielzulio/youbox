import User from "lib/model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  try {
    dbConnect()

    const user = await User.findOne({ email, password })

    if (user)
      return res.status(200).json({ message: "Akun telah berhasil masuk" })

    if (!user)
      return res
        .status(500)
        .json({ message: "Akun tidak tersedia di database!" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}
