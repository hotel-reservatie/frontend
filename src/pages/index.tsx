import React from 'react'
import type { NextPage } from 'next'
import Card from 'src/components/card'
import Button from 'src/components/button'
import { useGetAllRoomTypesQuery } from 'src/schema'
import RoomCard from 'src/components/roomCard'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import router from 'next/router'
import FormItem from 'src/classes/FormItem'
import Form from 'src/components/form'
import { useFilterValues } from 'src/providers/filterProvider'
import Skeleton from 'src/components/roomCard/Skeleton'

const Home: NextPage = () => {
  const { t } = useTranslation('common')

  const { loading, error, data } = useGetAllRoomTypesQuery()

  const { updateFilterValue } = useFilterValues()

  function showAvailability() {
    router.push('/rooms')
  }

  const formItems: Array<FormItem> = [
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

  function onDateChange(e: FormItem) {
    updateFilterValue(e.id, e.value)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto my-4 md:grid  md:grid-cols-2 md:mt-16">
        <div className="mb-8 mx-auto md:my-auto md:pr-4 md:text-center">
          <h1 className="font-bold text-blue-700 mb-2 md:text-4xl text-center md:text-left">
            {t('home.welcome')}
          </h1>
          <p className="text-blue-600 md:text-left leading-tight md:text-2xl text-center">
            {t('home.p1')}
          </p>
          <p className="text-blue-600 md:text-left leading-tight md:text-2xl text-center">
            {t('home.p2')}
          </p>
        </div>

        <Card className="w-full md:py-8 md:px-4">
          <h1 className="text-center mb-4 font-semibold md:text-lg">
            {t('datepicker.title')}
          </h1>
          <Form onItemChange={onDateChange} formItems={formItems} />
          <Button onClick={showAvailability}>
            {t('datepicker.availability')}
          </Button>
        </Card>
      </div>
      {loading && <Skeleton amount={3} />}
      {data?.getRoomTypes.map((type, index) => (
        <RoomCard
          key={`roomcard-${index}`}
          img={type.sampleImage}
          title={type.typeName}
          desc={type.description}
          price={type.startingPrice}
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
