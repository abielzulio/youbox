import { AuthProvider } from "context/auth"
import type { AppProps } from "next/app"
import "styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
