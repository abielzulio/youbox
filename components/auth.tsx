import AuthContext from "context/auth"
import { usePersistentLogin } from "hooks/usePersistentLogin"
import { useContext, useRef, useState } from "react"
import { EditProfile } from "components/profile/edit"

export const Auth = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false)

  const { setPersistentLogin } = usePersistentLogin()

  const { createUser, isLoggedIn, signOut, user } = useContext(AuthContext)

  const logInHandler = async (e: any): Promise<void> => {
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

    setShowAuthModal(false)
  }

  const signUpHandler = async (e: any): Promise<void> => {
    e.preventDefault()

    const email = emailInputRef?.current?.value
    const name = nameInputRef?.current?.value
    const password = passwordInputRef?.current?.value

    if (!email) return alert("E-mail perlu diisi!")
    if (!name) return alert("Nama perlu diisi!")
    if (!password) return alert("Password perlu diisi!")

    createUser({ email, password, name })

    setShowAuthModal(false)
  }

  const signOutHandler = (): void => {
    signOut()
    setShowAuthModal(false)
  }

  return (
    <>
      <div className="flex gap-[10px]">
        {user?.role === "user" && (
          <button
            onClick={() => setShowProfileModal((prev) => !prev)}
            className="px-[15px] py-[5px] bg-white rounded-md text-black border-[1px] border-black text-sm"
          >
            Profil
          </button>
        )}
        <button
          onClick={() =>
            isLoggedIn ? signOutHandler() : setShowAuthModal((prev) => !prev)
          }
          className="px-[15px] py-[5px] bg-black rounded-md text-white text-sm"
        >
          {isLoggedIn ? "Keluar" : showAuthModal ? "Batal" : "Masuk"}
        </button>
      </div>
      {showAuthModal && (
        <div className="sm:absolute shadow-lg shadow-gray-400 fixed z-10 bg-white px-[24px] py-[24px] m-auto sm:right-[24px] right-0 top-[50px]">
          <div className="w-full h-fit flex flex-col gap-[10px]">
            <p className="font-semibold">
              {isRegistering ? "Buat akun" : "Masuk akun"}
            </p>
            <form
              onSubmit={isRegistering ? signUpHandler : logInHandler}
              className="flex flex-col gap-[10px]"
            >
              {isRegistering && (
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="name" className="text-sm">
                    Nama Lengkap
                  </label>
                  <input
                    type="name"
                    id="name"
                    className="border-[1px] border-black h-[36px] pl-[12px]"
                    required
                    ref={nameInputRef}
                  />
                </div>
              )}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="email" className="text-sm">
                  Your Email
                </label>
                <input type="email" id="email" required ref={emailInputRef} />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="password" className="text-sm">
                  Your Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>
              <div className="mt-[5px]">
                <button className="bg-black text-white py-[10px] w-full rounded-md text-sm">
                  {isRegistering ? "Buat akun" : "Masuk akun"}
                </button>
              </div>
            </form>
            <button
              className="opacity-50 text-sm hover:opacity-100 transition"
              onClick={() => setIsRegistering((prev) => !prev)}
            >
              {!isRegistering ? "Buat akun baru" : "Masuk akun"}
            </button>
          </div>
        </div>
      )}
      {showProfileModal && (
        <div className="sm:absolute fixed z-10 bg-white px-[24px] py-[24px] m-auto right-0 top-[50px]">
          <div className="w-full h-fit flex flex-col gap-[10px]">
            <p className="font-semibold">Ubah Profil Akun</p>
            <EditProfile setShowModal={setShowProfileModal} />
          </div>
        </div>
      )}
    </>
  )
}
