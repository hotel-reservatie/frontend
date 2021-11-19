import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'

import Header from 'src/components/header'
import '../styles/globals.css'
import client from 'src/utils/apollo'
import { AuthProvider } from 'src/providers/authProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
