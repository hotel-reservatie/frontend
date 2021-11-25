import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Header from 'src/components/header'
import '../styles/globals.css'
import { AuthProvider } from 'src/providers/authProvider'
import ReservationProvider from 'src/providers/reservationProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ReservationProvider>
        <Header />
        <Component {...pageProps} />
      </ReservationProvider>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
