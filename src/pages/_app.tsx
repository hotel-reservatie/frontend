import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import Header from 'src/components/header'
import '../styles/globals.css'
import client from 'src/utils/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
