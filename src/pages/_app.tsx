import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'

import Header from 'src/components/header'
import '../styles/globals.css'
import client from 'src/utils/apollo'
import { AuthProvider, useAuth } from 'src/providers/authProvider'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Header />
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
