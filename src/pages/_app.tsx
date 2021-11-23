import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Header from 'src/components/header'
import '../styles/globals.css'
import { AuthProvider } from 'src/providers/authProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
