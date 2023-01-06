import { AuthProvider } from "context/auth"
import type { AppProps } from "next/app"
import { User } from "types/data"

const api = {
  login: (user: User) => Promise.resolve(),
  setUser: () => {},
  createUser: (user: User) => Promise.resolve(),
  signOut: () => Promise.resolve(),
}
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider api={api}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
