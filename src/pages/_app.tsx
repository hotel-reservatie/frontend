import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import dynamic from 'next/dynamic'
import '../styles/globals.css'

const Header = dynamic(() => import('src/components/header'))
const AppProvider = dynamic(() => import('src/providers/appProvider'))

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default appWithTranslation(MyApp)
