import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Card from 'src/components/card'
import DateInput from 'src/components/input/DateInput'
import Button from 'src/components/button'
import { useGetAllRoomTypesQuery } from 'src/schema'
import RoomCard from 'src/components/roomCard'
import { i18n, withTranslation } from 'next-i18next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import router from 'next/router'

const Home: NextPage = () => {
  const [dates, setDates] = useState<{
    arrival: null | Date
    departure: null | Date
  }>({ arrival: null, departure: null })

  const { t } = useTranslation('common')

  const { loading, error, data } = useGetAllRoomTypesQuery()

  function showAvailability() {
    router.push({
      pathname: '/rooms',
      query: { daterange: JSON.stringify(dates) },
    })
  }

  return (
    <>
      <div className="max-w-7xl mx-auto my-4 md:grid  md:grid-cols-2 md:mt-16">
        <div className="mb-8 mx-auto md:my-auto md:pr-4">
          <h1 className="font-bold text-blue-700 mb-2 md:text-4xl">
            {t('home.welcome')}
          </h1>
          <p className="text-blue-600 text-left leading-tight md:text-2xl">
            {t('home.p1')}
          </p>
          <p className="text-blue-600 text-left leading-tight md:text-2xl">
            {t('home.p2')}
          </p>
        </div>

        <Card className="w-full md:py-8 md:px-4">
          <h1 className="text-center mb-4 font-semibold md:text-lg">
            {t('datepicker.title')}
          </h1>
          <form>
            <DateInput
              placeholder={t('datepicker.arrivaldate')}
              className="text-center placeholder-blue-500"
              onChange={(d: Date) => {
                setDates({ ...dates, arrival: d })
              }}
              selected={dates.arrival}
              value={dates.arrival?.toLocaleDateString()}
            />
            <DateInput
              placeholder={t('datepicker.departuredate')}
              className="text-center placeholder-blue-500"
              onChange={(d: Date) => {
                setDates({ ...dates, departure: d })
              }}
              selected={dates.departure}
              value={dates.departure?.toLocaleDateString()}
            />
            <Button type="button" onClick={showAvailability}>
              {t('datepicker.availability')}
            </Button>
          </form>
        </Card>
      </div>
      {data?.getRoomTypes.map((type, index) => (
        <RoomCard
          key={`roomcard-${index}`}
          img={type.sampleImage}
          title={type.typeName}
          desc={type.description}
          price={90}
          size={type.capacity}
          loading={loading}
          id={type.roomTypeId}
          type={'roomType'}
        />
      ))}
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Home
