import React, {
  Children,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { NewReservationInput, Room } from 'src/schema'

interface INewReservation {
  details?: NewReservationInput
  roomIds?: String[]
}

interface IReservationContext {
  newReservation: INewReservation | undefined
  addRoom: (roomId: string) => Promise<boolean>
}

const ReservationContext = createContext<IReservationContext>(
  {} as IReservationContext,
)

export const useNewReservation = () => {
  return useContext(ReservationContext)
}

const localStorageKey = 'newReservation'

const ReservationProvider: FunctionComponent = ({ children }) => {
  const [newReservation, setNewReservation] = useState<INewReservation>()

  useEffect(() => {
    restoreReservation()
  }, [])

  const restoreReservation = () => {
    return new Promise((resolve, reject) => {
      const fromStorage = localStorage.getItem(localStorageKey)

      if (fromStorage) {
        const res = JSON.parse(fromStorage) as INewReservation
        setNewReservation(res)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  const updateReservation = (state: INewReservation) => {
    if (state) {
      localStorage.setItem(localStorageKey, JSON.stringify(state))
    }
  }

  const addRoom = (roomId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const updatedReservation = {
        ...newReservation,
        roomIds: newReservation?.roomIds
          ? [...newReservation.roomIds, roomId]
          : [roomId],
      }
      setNewReservation(updatedReservation)
      updateReservation(updatedReservation)
      resolve(true)
    })
  }

  const value = {
    newReservation,
    addRoom,
  }

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export default ReservationProvider
