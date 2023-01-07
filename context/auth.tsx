import { usePersistentLogin } from "hooks/usePersistentLogin"
import React, { createContext, useState } from "react"
import { AuthContextType, AuthProviderProps } from "types/context"
import { User } from "types/data"

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  error: "",
  setUser: () => {},
  login: () => Promise.resolve(),
  createUser: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const { setPersistentLogin } = usePersistentLogin()

  const login = async (user: User) => {
    const body = JSON.stringify(user)

    let res
    let data

    try {
      res = await fetch("/api/log-in", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
      data = (await res.json()) as User
    } catch (err) {
      setError(err as string)
    }

    if (res?.ok) {
      return setUser({ ...user, ...data }), setIsLoggedIn(true)
    }

    if (res?.status === 403) {
      return alert("Password Anda salah")
    }

    if (res?.status === 500) {
      return alert("Akun Anda belum terdaftar, silahkan buat akun baru!")
    }
  }

  const createUser = async (user: User) => {
    const body = JSON.stringify(user)

    let res
    let data

    try {
      res = await fetch("/api/sign-up", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
      data = (await res.json()) as User
    } catch (err) {
      setError(err as string)
    }

    if (res?.ok) {
      return alert("Akun telah dibuat, silahkan login!")
    }

    if (res?.status === 409) {
      return alert("E-mail telah digunakan, coba gunakan e-mail lain")
    }

    if (res?.status === 500) {
      return alert("Akun Anda belum terdaftar, silahkan buat akun baru!")
    }
  }

  const signOut = async () => {
    try {
      setPersistentLogin({
        value: false,
        expirationDuration: 0,
        user: { email: "", password: "" },
      })
      setUser(null)
      setIsLoggedIn(false)
    } catch (err) {
      setError(err as string)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, error, setUser, login, createUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
