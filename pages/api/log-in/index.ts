import User from "lib/model/user"
import dbConnect from "lib/mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  try {
    dbConnect()

    const count = await User.countDocuments({ email })

    if (count > 1)
      return res.status(403).json({ message: "Password Anda salah" })

    if (count === 0)
      return res.status(500).json({
        message: "Akun tidak tersedia di database, silahkan buat baru",
      })

    if (count === 1) {
      const user = await User.findOne(
        { email, password },
        { password: 0, _id: 0, __v: 0 }
      )
      if (user) return res.status(200).json(user)
      if (!user) return res.status(403).json({ message: "Password Anda salah" })
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Terdapat error di sisi klien!", error })
  }
}
