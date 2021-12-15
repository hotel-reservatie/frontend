import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Header from 'src/components/header'
import '../styles/globals.css'

import AppProvider from 'src/providers/appProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default appWithTranslation(MyApp)
