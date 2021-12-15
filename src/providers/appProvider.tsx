import { FunctionComponent } from 'react'
import { AuthProvider } from './authProvider'
import FilterProvider from './filterProvider'
import ReservationProvider from './reservationProvider'

const AppProvider: FunctionComponent = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <ReservationProvider>
          <FilterProvider>{children}</FilterProvider>
        </ReservationProvider>
      </AuthProvider>
    </>
  )
}

export default AppProvider
