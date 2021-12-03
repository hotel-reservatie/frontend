import React, { useEffect } from 'react'
import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  useGetUserReservationsLazyQuery,
  useGetUserReservationsQuery,
} from 'src/schema'
import Card from 'src/components/card'
import SubTitle from 'src/components/text/SubTitle'
import formatDate from 'src/utils/formatDate'
import { MdArrowForward, MdPeople } from 'react-icons/md'
import { HiMinusCircle } from 'react-icons/hi'

const Reservations = () => {
  const { signedIn } = useAuth()

  //   const { data } = useGetUserReservationsQuery()

  const handleDelete = () => {
    console.log('delete')
  }

  const [getUserReservations, { data }] = useGetUserReservationsLazyQuery()

  useEffect(() => {
    if (signedIn) {
      getUserReservations()
    }
  }, [signedIn])

  return (
    <PageLayout>
      <PageTitle>My Reservations</PageTitle>
      <Authenticated>
        <div className="md:grid md:grid-cols-2 gap-8">
          {data?.getUserReservations.map((r, index) => {
            return (
              <Card className="w-full px-8 py-8 max-w-full" key={r.reservationId}>
                <div className="flex justify-between">
                  <div>
                    <div className="mb-8">
                      <SubTitle className=" mb-0">{`Reservation # ${index}`}</SubTitle>
                      <p>{`${formatDate(r.startDate)} - ${formatDate(
                        r.endDate,
                      )}`}</p>
                    </div>
                    <div className="flex flex-row gap-8 text-blue-600">
                      <span className="flex flex-row align-baseline">
                        <MdPeople size={32} />
                        <p className="font-bold text-2xl  ml-3">0</p>
                      </span>
                      <p className=" font-semibold text-2xl ">
                        Rooms: {r.roomsReserved?.length}
                      </p>
                      <HiMinusCircle
                        onClick={handleDelete}
                        size={32}
                        className=" text-blue-300 hover:text-red-500 hover:scale-105 hover:cursor-pointer transition-transform"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <MdArrowForward size={24} className=" ml-auto" />
                    <span className="font-bold text-3xl text-blue-600">
                      €{r.totalPrice}
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Authenticated>
      <NotAuthenticated>
          <SubTitle>
              Please sign in to view your reservations...
          </SubTitle>
      </NotAuthenticated>
    </PageLayout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Reservations
