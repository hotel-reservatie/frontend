import React, { useEffect, useState } from 'react'
import DateInput from 'src/components/input/DateInput'
import PageLayout from 'src/components/layout/PageLayout'
import SmallRoomCard from 'src/components/roomCard/SmallRoomCard'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { useNewReservation } from 'src/providers/reservationProvider'
import { Room } from 'src/schema'

const NewReservation = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      currentPrice: 90,
      roomName: 'Familiekamer',
      roomType: {
        typeName: 'roomtype',
        capacity: 3,
        description: 'room type description',
      },
      surface: 16,
      roomId: '12dbb96e-5bd2-495c-a6a3-6784f822f32f',
    },
  ])

  const { addRoom, newReservation } = useNewReservation()

  useEffect(() => {
    console.log(newReservation)
  }, [newReservation])
  return (
    <PageLayout>
      <PageTitle>My Reservation</PageTitle>
      <SubTitle>Select Time</SubTitle>
      <div className="md:grid grid-cols-2 gap-6 mb-8">
        <DateInput placeholder={'Arrival Date'} onChange={() => {}} />
        <DateInput placeholder={'Departure Date'} onChange={() => {}} />
      </div>
      <SubTitle>Rooms</SubTitle>
      <div className="grid grid-cols-auto-lg">
        {rooms
          ? rooms.map(r => {
              return (
                <SmallRoomCard
                  key={r.roomId}
                  title={r.roomName?.toString()}
                  capacity={r.roomType.capacity}
                  surface={r.surface as number}
                  price={r.currentPrice as number}
                  roomId={r.roomId?.toString()}
                />
              )
            })
          : null}
      </div>
      <button
        onClick={() => {
          addRoom('hoi')
        }}
      >
        testje
      </button>
      <SubTitle>Booking Info</SubTitle>
    </PageLayout>
  )
}

export default NewReservation
