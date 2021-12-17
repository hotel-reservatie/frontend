import React, { ChangeEvent, useEffect, useState } from 'react'
import { MdAddCircle, MdEdit } from 'react-icons/md'
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
  useGetUserInfoLazyQuery,
  useGetUserInfoQuery,
  UserInput,
  useValidateReservationLazyQuery,
} from 'src/schema'
import Link from 'next/link'
import Button from 'src/components/button'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import { useMutation } from '@apollo/client'
import { CreateReservation } from 'src/schema/reservation/createReservation.schema'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Dialog from 'src/components/dialog'
import FormItem from 'src/classes/FormItem'
import { useTranslation } from 'react-i18next'
import Form from 'src/components/form'
import CustomerInfoSection from 'src/components/customerInfo'

const NewReservation = () => {
  const {
    setUserInfo,
    setDates,
    removeRoom,
    newReservation,
    resetReservation,
  } = useNewReservation()
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const { t } = useTranslation('common')
  const router = useRouter()

  const [showDialog, setShowDialog] = useState(false)
  const [roomToRemove, setroomToRemove] = useState('')

  const [createReservation, createReservationResult] =
    useMutation(CreateReservation)
  const [getUserInfo, { data, refetch }] = useGetUserInfoLazyQuery()

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

  // TODO: Add dateform that uses filterValue for the dates OR if there's already a reservation use those dates
  const dateForm: Array<FormItem> = [
    new FormItem({
      placeholder: t('datepicker.arrivaldate'),
      type: 'date',
      name: 'arrivalDate',
      id: 'startDate',
    }),
    new FormItem({
      placeholder: t('datepicker.departuredate'),
      type: 'date',
      name: 'departureDate',
      id: 'endDate',
    }),
  ]

  const userInfoForm: Array<FormItem> = [
    new FormItem({
      label: 'First Name',
      placeholder: 'John',
      id: 'firstname',
      autoComplete: 'given-name',
      value: newReservation?.details?.user?.firstName,
      name: 'firstname',
      className: 'col-span-2',
    }),
    new FormItem({
      label: 'Last Name',
      id: 'lastname',
      autoComplete: 'family-name',
      value: newReservation?.details?.user?.lastName,
      placeholder: 'Doe',
      name: 'lastname',
      className: 'col-span-2',
    }),
    new FormItem({
      label: 'Email',
      id: 'email',
      value: newReservation?.details?.user?.reservationEmail,
      type: 'email',
      autoComplete: 'email',
      placeholder: 'Doe',
      name: 'email',
      className: 'col-span-2',
    }),
    new FormItem({
      label: 'Phone',
      id: 'phone',
      value: newReservation?.details?.user?.phone,
      autoComplete: 'tel',
      name: 'phone',
      className: 'col-span-2',
    }),
    new FormItem({
      label: 'Address',
      id: 'address',
      value: newReservation?.details?.user?.address,
      autoComplete: 'street-address',
      name: 'address',
      className: 'col-span-2',
    }),
    new FormItem({
      label: 'City',
      id: 'city',
      value: '',
      autoComplete: 'address-level2',
      name: 'city',
    }),
    new FormItem({
      type: 'number',
      label: 'Postal Code',
      id: 'postal',
      value: newReservation?.details?.user?.city,
      autoComplete: 'postal-code',
      name: 'postal',
    }),
  ]

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
      </Authenticated>
      <NotAuthenticated>
        <p>Please sign in to create a booking...</p>
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
