import AuthContext from "context/auth"
import { useContext, useRef } from "react"

const Profile = () => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { user, signOut } = useContext(AuthContext)
  const updateProfileHandler = async (e: any, id: string) => {
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
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        signOut()
        return alert("Akun telah diperbarui, silahkan masuk lagi")
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteProfileHandler = async (e: any, id: string) => {
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
        return alert("Akun telah dihapus")
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form onSubmit={(e) => user?._id && updateProfileHandler(e, user._id)}>
        <div>
          <label htmlFor="name">Nama Lengkap</label>
          <input
            type="name"
            id="name"
            required
            ref={nameInputRef}
            defaultValue={user?.name}
          />
        </div>
        <div>
          <label htmlFor="name">E-mail</label>
          <input
            type="name"
            id="name"
            required
            ref={emailInputRef}
            defaultValue={user?.email}
          />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            defaultValue={user?.password}
          />
        </div>
        <div>
          <button>Ubah</button>
        </div>
      </form>
      <button onClick={(e) => user?._id && deleteProfileHandler(e, user._id)}>
        Hapus akun
      </button>
    </>
  )
}

export default Profile
