import { Auth } from "components/auth"
import { AuthProvider } from "context/auth"
import type { AppProps } from "next/app"
import Link from "next/link"
import "styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex justify-between md:px-[48px] px-[24px] py-[18px] shadow-lg shadow-dark-200">
        <Link href="/" className="font-bold">
          YouBox
        </Link>
        <Auth />
      </div>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
