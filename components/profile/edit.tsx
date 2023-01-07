import AuthContext from "context/auth"
import { Dispatch, SetStateAction, useContext, useRef } from "react"

export const EditProfile = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { user, signOut } = useContext(AuthContext)

  const updateProfileHandler = async (e: any, id: string): Promise<void> => {
    e.preventDefault()
    const email = emailInputRef?.current?.value
    const name = nameInputRef?.current?.value
    const password = passwordInputRef?.current?.value

    if (!email) return alert("E-mail perlu diisi!")
    if (!name) return alert("Nama perlu diisi!")
    if (!password) return alert("Password perlu diisi!")

    const _new = { id, email, password, name }

    const body = JSON.stringify(_new)

    try {
      await fetch("/api/profile/update", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        signOut()
        setShowModal(false)
        return alert("Akun telah diperbarui, silahkan masuk lagi")
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteProfileHandler = async (e: any, id: string): Promise<void> => {
    e.preventDefault()

    const body = JSON.stringify({ id })

    try {
      await fetch("/api/profile/delete", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        signOut()
        setShowModal(false)
        return alert("Akun telah dihapus")
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-[10px]"
        onSubmit={(e) => user?._id && updateProfileHandler(e, user._id)}
      >
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="name" className="text-sm">
            Nama Lengkap
          </label>
          <input
            type="name"
            id="name"
            required
            ref={nameInputRef}
            defaultValue={user?.name}
            className="border-[1px] border-black h-[36px] pl-[12px]"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="email" className="text-sm">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            className="border-[1px] border-black h-[36px] pl-[12px]"
            ref={emailInputRef}
            defaultValue={user?.email}
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="password" className="text-sm">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="border-[1px] border-black h-[36px] pl-[12px]"
            ref={passwordInputRef}
            defaultValue={user?.password}
          />
        </div>
        <div className="mt-[5px]">
          <button className="bg-black text-white py-[10px] w-full rounded-md text-sm">
            Ubah
          </button>
        </div>
      </form>
      <button
        className="opacity-50 text-sm hover:opacity-100 transition"
        onClick={(e) => user?._id && deleteProfileHandler(e, user._id)}
      >
        Hapus akun
      </button>
    </>
  )
}
