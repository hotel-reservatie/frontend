import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Authenticated, useAuth } from 'src/providers/authProvider'
import {
  useDeleteReservationMutation,
  useGetReservationQuery,
} from 'src/schema'
import formatDate from 'src/utils/formatDate'
import dynamic from 'next/dynamic'

const Button = dynamic(() => import('src/components/button'))
const Dialog = dynamic(() => import('src/components/dialog'))
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))
const SmallRoomCard = dynamic(
  () => import('src/components/roomCard/SmallRoomCard'),
)
const PageTitle = dynamic(() => import('src/components/text/PageTitle'))
const SubTitle = dynamic(() => import('src/components/text/SubTitle'))
const Translater = dynamic(() => import('src/components/translater'))

const Reservation = () => {
  const router = useRouter()

  const { user } = useAuth()
  const { reservationId } = router.query

  const [dialogIsVisible, setDialogIsVisible] = useState(false)
  const reservationResult = useGetReservationQuery({
    variables: { reservationId: reservationId as string },
  })
  const [deleteReservation] = useDeleteReservationMutation()

  const handleCancelBtn = () => {
    deleteReservation({
      variables: { reservationId: reservationId as string },
    }).then(() => {
      setDialogIsVisible(false)
      router.push('/profile/reservations')
    })
  }

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
              <Translater>Checkin</Translater>:{' '}
              {formatDate(reservationResult.data?.getReservation.startDate)}{' '}
            </p>
            <p>
              <Translater>Checkout</Translater>:{' '}
              {formatDate(reservationResult.data?.getReservation.endDate)}{' '}
            </p>
            <p>
              <Translater>Total amount of days</Translater>:{' '}
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
              <p>
                <Translater>Total amount of days</Translater>
              </p>
              <p>{reservationResult.data?.getReservation.totalAmountOfDays}</p>
            </div>
            <div className="flex justify-between mb">
              <p>
                <Translater>Amount of weekend days</Translater>
              </p>
              <p>{reservationResult.data?.getReservation.weekendDays}</p>
            </div>
            <div className="flex justify-between mb">
              <p>
                <Translater>Rooms</Translater>
              </p>
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
                            <span>???{r.price}</span>
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
            <SubTitle>{`???${
              reservationResult.data?.getReservation.totalPrice
                ? reservationResult.data.getReservation.totalPrice
                : 0
            }`}</SubTitle>
          </div>
          <div className="flex justify-center">
            <Button
              className="w w-72 bg-red-500 hover:bg-red-400"
              onClick={() => {
                setDialogIsVisible(true)
              }}
            >
              <Translater>CANCEL RESERVATION</Translater>
            </Button>
          </div>
        </Authenticated>
        <Dialog
          title="Warning!"
          show={dialogIsVisible}
          onRequestConfirm={() => {
            handleCancelBtn()
            setDialogIsVisible(false)
          }}
          onRequestClose={() => {
            setDialogIsVisible(false)
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
