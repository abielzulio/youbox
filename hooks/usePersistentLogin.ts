import AuthContext from "context/auth"
import { useContext, useState, useEffect } from "react"

const LOGIN_STATUS_KEY = "loginStatus"
const LOGIN_EXPIRATION_KEY = "loginExpiration"

interface PersistentLoginType {
  value: boolean
  expirationDuration: number
  user: { email: string; password: string }
}

export const usePersistentLogin = (): {
  error: string
  setPersistentLogin: ({
    value,
    expirationDuration,
    user,
  }: PersistentLoginType) => void
  isAuthLoading: boolean
} => {
  const { login } = useContext(AuthContext)

  const [error, setError] = useState<string>("")
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)

  useEffect(() => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS_KEY)
    const loginExpiration = localStorage.getItem(LOGIN_EXPIRATION_KEY)

    if (loginStatus && loginExpiration) {
      const expirationTimestamp = Number(loginExpiration)
      const currentTimestamp = Date.now()
      if (currentTimestamp < expirationTimestamp) {
        login({
          email: localStorage.getItem("email") || "",
          password: localStorage.getItem("password") || "",
        })
          .then(() => setIsAuthLoading(false))
          .catch((error) => {
            setError(error.message)
          })
      } else {
        localStorage.removeItem(LOGIN_STATUS_KEY)
        localStorage.removeItem(LOGIN_EXPIRATION_KEY)
      }
    }
  }, [])

  const setPersistentLogin = ({
    value,
    expirationDuration,
    user,
  }: PersistentLoginType) => {
    if (value) {
      login(user).then(() => {
        localStorage.setItem(LOGIN_STATUS_KEY, "true")
        localStorage.setItem("email", user.email)
        localStorage.setItem("password", user.password)
        const expirationTimestamp = Date.now() + expirationDuration
        localStorage.setItem(
          LOGIN_EXPIRATION_KEY,
          expirationTimestamp.toString()
        )
        setIsAuthLoading(false)
      })
    } else {
      localStorage.removeItem(LOGIN_STATUS_KEY)
      localStorage.removeItem(LOGIN_EXPIRATION_KEY)
      localStorage.removeItem("email")
      localStorage.removeItem("password")
    }
  }

  return {
    error,
    setPersistentLogin,
    isAuthLoading,
  }
}
