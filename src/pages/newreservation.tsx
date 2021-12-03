import React, { ChangeEvent, useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import Card from 'src/components/card'
import Input from 'src/components/input'
import DateInput from 'src/components/input/DateInput'
import PageLayout from 'src/components/layout/PageLayout'
import SmallRoomCard from 'src/components/roomCard/SmallRoomCard'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { useNewReservation } from 'src/providers/reservationProvider'
import {
  Room,
  useGetFilteredRoomsQuery,
  UserInput,
  useValidateReservationLazyQuery,
  useValidateReservationQuery,
} from 'src/schema'
import Link from 'next/link'
import Button from 'src/components/button'
import { useAuth } from 'src/providers/authProvider'
import { useMutation } from '@apollo/client'
import { CreateReservation } from 'src/schema/reservation/createReservation.schema'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewReservation = () => {
  const { setUserInfo, setDates, removeRoom, newReservation } = useNewReservation()
  const { user } = useAuth()

  const [createReservation, createReservationResult] = useMutation(CreateReservation)
  const [validateReservation, validated] = useValidateReservationLazyQuery()
  const res = useGetFilteredRoomsQuery({
    variables: {
      roomFilter: {
        roomIds: newReservation?.roomIds
          ? (newReservation.roomIds as string[])
          : [],
      },
    },
  })

  const calculateRoomPrice = (
    r: Room,
    totalDays: number,
    weekendDays: number,
  ) => {
    return (
      r.currentPrice! * (totalDays - weekendDays) +
      r.currentPrice! * r.weekendMultiplier! * weekendDays
    )
  }

  const handleDeleteRoom = (roomId: string) => {
    console.log(roomId)

    removeRoom(roomId)
  }

  const handleConfirmButton = () => {
    
    if(newReservation){
      createReservation({variables: {newReservation: newReservation.details, roomIds: newReservation.roomIds}})
    }
  }

  useEffect(() => {
    console.log(createReservationResult);
    
  }, [createReservationResult])

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    if (
      newReservation?.roomIds &&
      newReservation.details?.startDate &&
      newReservation.details.endDate
    ) {
      validateReservation({
        variables: {
          roomIds: newReservation.roomIds as string[],
          newReservation: newReservation.details,
        },
      })
    }
  }, [
    newReservation?.details?.startDate,
    newReservation?.details?.endDate,
    newReservation?.roomIds,
  ])

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
          value={newReservation?.details?.startDate}
        />
        <DateInput
          placeholder={'Departure Date'}
          onChange={(d: Date) => {
            setDates(newReservation?.details?.startDate, d)
          }}
          selected={newReservation?.details?.endDate}
          value={newReservation?.details?.endDate?.toLocaleDateString()}
        />
      </div>
      <SubTitle>Rooms</SubTitle>
      <div className="grid grid-cols-auto-lg gap-6 mb-8">
        {res.data?.getRooms
          ? res.data.getRooms.map(r => {
              const isValid =
                !validated.data?.validateReservation.invalidRooms?.includes(
                  r.roomId as string,
                )
              return (
                <SmallRoomCard
                  isValid={isValid}
                  key={r.roomId}
                  title={r.roomName?.toString()}
                  capacity={r.roomType.capacity}
                  surface={r.surface as number}
                  price={r.currentPrice as number}
                  weekendMultiplier={r.weekendMultiplier as number}
                  roomId={r.roomId?.toString()}
                  onDelete={handleDeleteRoom}
                />
              )
            })
          : null}
        <Link href={'/rooms'}>
          <a>
            <Card
              className={
                'w-full min-h-300 px-8 py-8 flex items-center justify-center transition-transform hover:cursor-pointer hover:scale-105'
              }
            >
              <MdAddCircle size={64} />
            </Card>
          </a>
        </Link>
      </div>
      <SubTitle>Customer Info</SubTitle>
      <form className="md:grid grid-cols-2 gap-6 mb-8" action="">
        <Input
          label={'First Name'}
          id="fristname"
          value={newReservation?.details?.user?.firstName? newReservation?.details?.user?.firstName as string: ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...newReservation?.details?.user, firstName: e.target.value })
          }}
          placeholder={'John'}
        />
        <Input
          label={'Last Name'}
          id="lastname"
          value={newReservation?.details?.user?.lastName? newReservation?.details?.user?.lastName as string: ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...newReservation?.details?.user, lastName: e.target.value })
          }}
          placeholder={'Doe'}
        />
        <Input
          label={'Email'}
          id="email"
          value={newReservation?.details?.user?.reservationEmail? newReservation?.details?.user?.reservationEmail as string: ''}
          autoComplete={'email'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...newReservation?.details?.user, reservationEmail: e.target.value })
          }}
          placeholder={'Doe'}
        />
        <Input
          label={'Phone'}
          id="phone"
          value={newReservation?.details?.user?.phone? newReservation?.details?.user?.phone as string: ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...newReservation?.details?.user, phone: e.target.value })
          }}
        />
        <Input
          label={'Address'}
          id="address"
          value={newReservation?.details?.user?.address? newReservation.details.user.address as string: ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserInfo({ ...newReservation?.details?.user, address: e.target.value })
          }}
        />
        <div className="grid grid-cols-2 gap-6">
          <Input
            label={'City'}
            id="city"
            value={newReservation?.details?.user?.city? newReservation?.details?.user?.city as string: ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserInfo({ ...newReservation?.details?.user, city: e.target.value })
            }}
          />
          <Input
            type={'number'}
            label={'Postal Code'}
            id="postal"
            value={newReservation?.details?.user?.postal? newReservation?.details?.user.postal : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.valueAsNumber

              if(val){
                setUserInfo({
                  ...newReservation?.details?.user,
                  postal: e.target.valueAsNumber,
                })
              } else {
                setUserInfo({
                  ...newReservation?.details?.user,
                  postal: undefined,
                })
              }
              
            }}
          />
        </div>
      </form>
      <SubTitle>Booking Info</SubTitle>
      <div className="mb-8">
        <div className="flex justify-between mb">
          <p>Total amount of days</p>
          <p>{validated.data?.validateReservation.totalDays}</p>
        </div>
        <div className="flex justify-between mb">
          <p>Amount of weekend days</p>
          <p>{validated.data?.validateReservation.weekendDays}</p>
        </div>
        <div className="flex justify-between mb">
          <p>Rooms</p>
          <p>{newReservation?.roomIds?.length}</p>
        </div>
        <ul className=" pl-8 list-disc">
          {res.data?.getRooms?.map(r => {
            return (
              <li key={`roominfo ${r.roomId}`}>
                <div className="flex justify-between">
                  {r.roomName}
                  <span>
                    {`€${
                      validated.data?.validateReservation.isValid
                        ? calculateRoomPrice(
                            r as Room,
                            validated.data.validateReservation
                              .totalDays as number,
                            validated.data.validateReservation
                              .weekendDays as number,
                          )
                        : 0
                    }`}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex justify-between">
        <SubTitle>Total Price</SubTitle>
        <SubTitle>{`€${
          validated.data?.validateReservation.totalPrice
            ? validated.data?.validateReservation.totalPrice
            : 0
        }`}</SubTitle>
      </div>
      <div className="flex justify-center">
        <Button
          className="w w-72"
          disabled={!validated.data?.validateReservation.isValid}
          onClick={handleConfirmButton}
        >
          Confirm Booking
        </Button>
      </div>
    </PageLayout>
  )
}

export default NewReservation

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
