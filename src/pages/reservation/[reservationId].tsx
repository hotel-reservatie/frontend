import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from 'src/components/button'
import Dialog from 'src/components/dialog'
import PageLayout from 'src/components/layout/PageLayout'
import SmallRoomCard from 'src/components/roomCard/SmallRoomCard'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { Authenticated, useAuth } from 'src/providers/authProvider'
import { useDeleteReservationMutation, useGetReservationLazyQuery, useGetReservationQuery } from 'src/schema'
import formatDate from 'src/utils/formatDate'

const Reservation = () => {
  const router = useRouter()

  const { user } = useAuth()
  const { reservationId } = router.query

  const [dialogIsVisible, setDialogIsVisible] = useState(false)
  //   const [getReservation, reservationResult] = useGetReservationLazyQuery()
  const reservationResult = useGetReservationQuery({
    variables: { reservationId: reservationId as string },
  })
  const [deleteReservation] = useDeleteReservationMutation()

  useEffect(() => {
    console.log(reservationResult)
  }, [reservationResult])

  const handleCancelBtn = () => {
    deleteReservation({ variables: { reservationId: reservationId as string } }).then(() => {
        setDialogIsVisible(false);
        router.push('/reservations')
      })
  }

  //   useEffect(() => {
  //     if (reservationId && user) {
  //       getReservation({ variables: { reservationId: reservationId as string } })
  //     }
  //   }, [router.query, user])
  if (!reservationResult.called || reservationResult.loading) {
    return (
      <PageLayout>
        <PageTitle>Loading...</PageTitle>
      </PageLayout>
    )
  } else {
    return (
      <PageLayout>
        <PageTitle>My Reservation</PageTitle>
        <Authenticated>
          <div className="mb-8">
            <SubTitle>Arrival and departure</SubTitle>
            <p>
              Checkin:{' '}
              {formatDate(reservationResult.data?.getReservation.startDate)}{' '}
            </p>
            <p>
              Checkout:{' '}
              {formatDate(reservationResult.data?.getReservation.endDate)}{' '}
            </p>
            <p>
              Total amount of days:{' '}
              {reservationResult.data?.getReservation.totalAmountOfDays}
            </p>
          </div>
          <SubTitle>Rooms</SubTitle>
          <div className="grid grid-cols-auto-lg gap-6 mb-8">
            {reservationResult.data?.getReservation
              ? reservationResult.data.getReservation.roomsReserved?.map(r => {
                  return (
                    <SmallRoomCard
                      key={r.room.roomId}
                      title={r.room.roomName?.toString()}
                      capacity={r.room.roomType.capacity}
                      surface={r.room.surface as number}
                      price={r.room.currentPrice as number}
                      weekendMultiplier={r.room.weekendMultiplier as number}
                      roomId={r.room.roomId?.toString()}
                      isValid={true}
                      isEditable={false}
                    />
                  )
                })
              : null}
          </div>
          <SubTitle>Booking Info</SubTitle>
          <div className="mb-8">
            <div className="flex justify-between mb">
              <p>Total amount of days</p>
              <p>{reservationResult.data?.getReservation.totalAmountOfDays}</p>
            </div>
            <div className="flex justify-between mb">
              <p>Amount of weekend days</p>
              <p>{reservationResult.data?.getReservation.weekendDays}</p>
            </div>
            <div className="flex justify-between mb">
              <p>Rooms</p>
              <p>
                {reservationResult.data?.getReservation.roomsReserved?.length}
              </p>
            </div>
            <ul className=" pl-8 list-disc">
              {reservationResult.data?.getReservation
                ? reservationResult.data.getReservation.roomsReserved?.map(
                    r => {
                      return (
                        <li key={`roominfo ${r.room.roomId}`}>
                          <div className="flex justify-between">
                            {r.room.roomName}
                            <span>€{r.price}</span>
                          </div>
                        </li>
                      )
                    },
                  )
                : null}
            </ul>
          </div>
          <div className="flex justify-between">
            <SubTitle>Total Price</SubTitle>
            <SubTitle>{`€${
              reservationResult.data?.getReservation.totalPrice
                ? reservationResult.data.getReservation.totalPrice
                : 0
            }`}</SubTitle>
          </div>
          <div className="flex justify-center">
            <Button className="w w-72 bg-red-500 hover:bg-red-400" onClick={() => {
                setDialogIsVisible(true);
            }}>
              CANCEL RESERVATION
            </Button>
          </div>
        </Authenticated>
        <Dialog
          title="Warning!"
          show={dialogIsVisible}
          onRequestConfirm={() => {
            handleCancelBtn()
            setDialogIsVisible(false);
          }}
          onRequestClose={() => {
              setDialogIsVisible(false);
          }}
          description="You are about to cancel your reservation. Are you sure you want to continue?"
        />
      </PageLayout>
    )
  }
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Reservation
