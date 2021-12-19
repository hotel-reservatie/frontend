import React, { useEffect, useState } from 'react'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  useDeleteReservationMutation,
  useGetUserReservationsLazyQuery,
} from 'src/schema'
import Card from 'src/components/card'
import SubTitle from 'src/components/text/SubTitle'
import formatDate from 'src/utils/formatDate'
import { MdArrowForward, MdPeople } from 'react-icons/md'
import { HiMinusCircle } from 'react-icons/hi'
import Dialog from 'src/components/dialog'
import { useRouter } from 'next/router'
import Link from 'src/components/translatedLink'
import ProfileNavigation from 'src/components/navigation/profileNavigation'
import Translater from 'src/components/translater'
import EmptyPlaceholder from 'src/components/emptyPlaceholder'
import NotSignedIn from 'src/components/emptyPlaceholder/NotSignedIn'

const Reservations = () => {
  const [show, setShow] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string>('')
  const handleClose = () => setShow(false)
  const { user } = useAuth()
  const [deleteReservation] = useDeleteReservationMutation()

  const handleClickDelete = (id: string) => {
    deleteReservation({ variables: { reservationId: id } }).then(() => {
      handleClose()
      if (userReservationResult.refetch) userReservationResult.refetch()
    })
  }

  const [getUserReservations, userReservationResult] =
    useGetUserReservationsLazyQuery({ fetchPolicy: 'no-cache' })

  useEffect(() => {
    if (user) {
      getUserReservations()
    }
  }, [user])

  return (
    <ProfileNavigation title="My Reservations">
      <Authenticated>
        <div className="lg:grid lg:grid-cols-2 gap-x-8">
          {userReservationResult.data?.getUserReservations[0] ? (
            userReservationResult.data.getUserReservations.map((r, index) => {
              return (
                <Card
                  className="w-full px-8 py-8 max-w-full mb-8 mx-0"
                  key={r.reservationId}
                >
                  <div className="sm:flex justify-between">
                    <div>
                      <div className="mb-8">
                        <Link href={`/reservation/${r.reservationId}`}>
                          <a>
                            <span className="flex items-center gap-2">
                              <SubTitle className=" mb-0">Reservation</SubTitle>
                              <h2
                                className={` text-2xl font-semibold text-blue-600`}
                              >
                                &nbsp;{`#${index}`}
                              </h2>
                              <div>
                                <MdArrowForward size={24} />
                              </div>
                            </span>
                          </a>
                        </Link>

                        <p>{`${formatDate(r.startDate)} - ${formatDate(
                          r.endDate,
                        )}`}</p>
                      </div>
                      <div className="flex flex-row gap-8 text-blue-600">
                        <span className="flex flex-row align-baseline">
                          <MdPeople size={32} />
                          <p className="font-bold text-2xl  ml-3">0</p>
                        </span>
                        <p className=" font-semibold text-2xl whitespace-nowrap">
                          <Translater>Rooms</Translater>:{' '}
                          {r.roomsReserved?.length}
                        </p>
                        <HiMinusCircle
                          onClick={() => {
                            setIdToDelete(r.reservationId as string)
                            setShow(true)
                          }}
                          size={32}
                          className=" text-blue-300 hover:text-red-500 hover:scale-105 hover:cursor-pointer transition-transform"
                        />
                      </div>
                    </div>
                    <p className="mt-4 sm:mt-0 font-bold text-3xl text-blue-600">
                      €{r.totalPrice}
                    </p>
                  </div>
                </Card>
              )
            })
          ) : (
            <EmptyPlaceholder href="/newreservation">
              Start booking now
            </EmptyPlaceholder>
          )}
        </div>
      </Authenticated>
      <NotAuthenticated>
        <NotSignedIn>Please sign in to view your reservations...</NotSignedIn>
      </NotAuthenticated>
      <Dialog
        title="Warning!"
        show={show}
        onRequestConfirm={() => {
          handleClickDelete(idToDelete)
        }}
        onRequestClose={handleClose}
        description="This action will delete your reservation permanently. Continue?"
      />
    </ProfileNavigation>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Reservations
