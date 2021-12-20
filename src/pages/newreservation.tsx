import { useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { CreateReservation } from 'src/schema/reservation/createReservation.schema'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useNewReservation } from 'src/providers/reservationProvider'
import FormItem from 'src/classes/FormItem'
import {
  Room,
  useGetFilteredRoomsQuery,
  useGetUserInfoLazyQuery,
  UserInput,
  useValidateReservationLazyQuery,
} from 'src/schema'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import dynamic from 'next/dynamic'

const Link = dynamic(() => import('next/link'))
const Dialog = dynamic(() => import('src/components/dialog'))
const Button = dynamic(() => import('src/components/button'))
const CustomerInfoSection = dynamic(() => import('src/components/customerInfo'))
const Translater = dynamic(() => import('src/components/translater'))
const Card = dynamic(() => import('src/components/card'))
const DateInput = dynamic(() => import('src/components/input/DateInput'))
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))
const SmallRoomCard = dynamic(
  () => import('src/components/roomCard/SmallRoomCard'),
)
const PageTitle = dynamic(() => import('src/components/text/PageTitle'))
const SubTitle = dynamic(() => import('src/components/text/SubTitle'))

const NewReservation = () => {
  const { setDates, removeRoom, newReservation, resetReservation } =
    useNewReservation()
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const [showDialog, setShowDialog] = useState(false)
  const [roomToRemove, setroomToRemove] = useState('')

  const [createReservation] = useMutation(CreateReservation)
  const [getUserInfo, { data }] = useGetUserInfoLazyQuery()

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
    removeRoom(roomId)
    setShowDialog(false)
  }

  const handleShowDialog = (roomId: string) => {
    setShowDialog(true)
    setroomToRemove(roomId)
  }

  const handleHideDialog = () => {
    setShowDialog(false)
  }

  const handleConfirmButton = () => {
    setSubmitting(true)
  }

  useEffect(() => {
    if (user) {
      getUserInfo()
    }
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

  function handleSubmit(e: FormItem[]) {
    if (newReservation) {
      createReservation({
        variables: {
          newReservation: newReservation.details,
          roomIds: newReservation.roomIds,
        },
      }).then(async () => {
        resetReservation()
        await router.push('profile/reservations')
      })
    }
  }

  return (
    <PageLayout>
      <PageTitle>My Reservation</PageTitle>
      <Authenticated>
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
                    onDelete={handleShowDialog}
                  />
                )
              })
            : null}
          <Dialog
            title="Warning!"
            show={showDialog}
            onRequestConfirm={() => {
              handleDeleteRoom(roomToRemove)
            }}
            onRequestClose={handleHideDialog}
            description="This action will remove this room from the reservation. Proceed?"
          />
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
        {data ? (
          <CustomerInfoSection
            userInfo={data?.getUserInfo as UserInput}
            isEditing={true}
            submitting={submitting}
            setSubmitting={setSubmitting}
            onSubmit={handleSubmit}
            requiredFormFields={true}
          />
        ) : null}

        <SubTitle>Booking Info</SubTitle>
        <div className="mb-8">
          <div className="flex justify-between mb">
            <p>
              <Translater>Total amount of days</Translater>
            </p>
            <p>{validated.data?.validateReservation.totalDays}</p>
          </div>
          <div className="flex justify-between mb">
            <p>
              <Translater>Amount of weekend days</Translater>
            </p>
            <p>{validated.data?.validateReservation.weekendDays}</p>
          </div>
          <div className="flex justify-between mb">
            <p>
              <Translater>Rooms</Translater>
            </p>
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
            <Translater>Confirm Booking</Translater>
          </Button>
        </div>
      </Authenticated>
      <NotAuthenticated>
        <p>
          <Translater>Please sign in to create a booking...</Translater>
        </p>
      </NotAuthenticated>
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default NewReservation
