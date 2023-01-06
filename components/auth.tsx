import AuthContext from "context/auth"
import { usePersistentLogin } from "hooks/usePersistentLogin"
import { useContext, useRef, useState } from "react"

export const Auth = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { setPersistentLogin, isAuthLoading } = usePersistentLogin()

  const { createUser, isLoggedIn, signOut, user } = useContext(AuthContext)

  const logInHandler = async (e: any) => {
    e.preventDefault()

    const email = emailInputRef?.current?.value
    const password = passwordInputRef?.current?.value

    if (!email) return alert("E-mail perlu diisi!")
    if (!password) return alert("Password perlu diisi!")

    setPersistentLogin({
      value: true,
      expirationDuration: 86400000,
      user: { email, password },
    })
  }

  const signUpHandler = async (e: any) => {
    e.preventDefault()

    const email = emailInputRef?.current?.value
    const name = nameInputRef?.current?.value
    const password = passwordInputRef?.current?.value

    if (!email) return alert("E-mail perlu diisi!")
    if (!name) return alert("Nama perlu diisi!")
    if (!password) return alert("Password perlu diisi!")

    createUser({ email, password, name })
  }

  const signOutHandler = () => {
    signOut()
  }
  return (
    <>
      {!isAuthLoading ? (
        !isLoggedIn ? (
          <>
            <h1>{isRegistering ? "Buat akun" : "Masuk akun"}</h1>
            <form onSubmit={isRegistering ? signUpHandler : logInHandler}>
              {isRegistering && (
                <div>
                  <label htmlFor="name">Nama Lengkap</label>
                  <input type="name" id="name" required ref={nameInputRef} />
                </div>
              )}
              <div>
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required ref={emailInputRef} />
              </div>
              <div>
                <label htmlFor="password">Your Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>
              <div>
                <button>{isRegistering ? "Buat akun" : "Masuk akun"}</button>
              </div>
            </form>
            <button onClick={() => setIsRegistering((prev) => !prev)}>
              {!isRegistering ? "Buat akun baru" : "Masuk akun"}
            </button>
          </>
        ) : (
          isLoggedIn && <button onClick={signOutHandler}>keluar</button>
        )
      ) : (
        <p>loading</p>
      )}
    </>
  )
}
