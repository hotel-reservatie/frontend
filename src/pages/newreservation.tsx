import React, { useEffect, useState } from 'react'
import Input from 'src/components/input'
import DateInput from 'src/components/input/DateInput'
import PageLayout from 'src/components/layout/PageLayout'
import SmallRoomCard from 'src/components/roomCard/SmallRoomCard'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { useNewReservation } from 'src/providers/reservationProvider'
import { Room, useGetFilteredRoomsQuery } from 'src/schema'

const NewReservation = () => {
  const { setDates, newReservation } = useNewReservation()
  const res = useGetFilteredRoomsQuery({
    variables: {
      roomFilter: {
        roomIds: newReservation?.roomIds
          ? (newReservation.roomIds as string[])
          : [],
      },
    },
  })

  return (
    <PageLayout>
      <PageTitle>My Reservation</PageTitle>
      <SubTitle>Select Time</SubTitle>
      <div className="md:grid grid-cols-2 gap-6 mb-8">
        <DateInput
          placeholder={'Arrival Date'}
          onChange={(d: Date) => {
            setDates(d, newReservation?.details?.endDate)
          }}
          selected={newReservation?.details?.startDate}
          value={newReservation?.details?.startDate.toLocaleDateString()}
        />
        <DateInput
          placeholder={'Departure Date'}
          onChange={(d: Date) => {
            setDates(newReservation?.details?.startDate, d)
          }}
          selected={newReservation?.details?.endDate}
          value={newReservation?.details?.endDate.toLocaleDateString()}
        />
      </div>
      <SubTitle>Rooms</SubTitle>
      <div className="grid grid-cols-auto-lg gap-6 mb-8">
        {res.data?.getRooms
          ? res.data.getRooms.map(r => {
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
      <SubTitle>Booking Info</SubTitle>
      <form className="md:grid grid-cols-2 gap-6" action="">
        <Input
          label={'First Name'}
          id="fristname"
          onChange={() => {}}
          placeholder={'John'}
        />
        <Input
          label={'Last Name'}
          id="lastname"
          onChange={() => {}}
          placeholder={'Doe'}
        />
        <Input
          label={'Email'}
          id="email"
          autoComplete={'email'}
          onChange={() => {}}
          placeholder={'Doe'}
        />
        <Input label={'Phone'} id="phone" onChange={() => {}} />
        <Input label={'Address'} id="address" onChange={() => {}} />
        <div className="grid grid-cols-2 gap-6">
          <Input label={'City'} id="city" onChange={() => {}} />
          <Input label={'Postal Code'} id="postal" onChange={() => {}} />
        </div>
      </form>
    </PageLayout>
  )
}

export default NewReservation
