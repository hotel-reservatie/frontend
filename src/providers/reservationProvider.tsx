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
  setDates: (startDate: Date, endDate: Date) => Promise<boolean>
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
        const parsedDates: INewReservation = {
          ...res,
          details: {
            startDate: new Date(res.details?.startDate),
            endDate: new Date(res.details?.endDate),
          },
        }
        
        setNewReservation(parsedDates)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  const updateReservation = (state: INewReservation) => {
    if (state) {
      setNewReservation(state)
      localStorage.setItem(localStorageKey, JSON.stringify(state))
    }
  }

  const addRoom = (roomId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (newReservation?.roomIds?.includes(roomId)) {
        resolve(false)
      } else {
        const updatedReservation = {
          ...newReservation,
          roomIds: newReservation?.roomIds
            ? [...newReservation.roomIds, roomId]
            : [roomId],
        }
        updateReservation(updatedReservation)
        resolve(true)
      }
    })
  }

  const setDates = (startDate: Date, endDate: Date): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const updatedReservation: INewReservation = {
        ...newReservation,
        details: {
          startDate: startDate,
          endDate: endDate,
        },
      }
      updateReservation(updatedReservation)
      resolve(true)
    })
  }

  const value = {
    newReservation,
    addRoom,
    setDates,
  }

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export default ReservationProvider
