import React, { useState } from 'react'
import type { NextPage } from 'next'
import Header from 'src/components/header'
import Card from 'src/components/card'
import DateInput from 'src/components/input/DateInput'
import Button from 'src/components/button'
import useI18n from 'src/hooks/useI18n'

const Home: NextPage = () => {
  const [dates, setDates] = useState<{
    arrival: null | Date
    departure: null | Date
  }>({ arrival: null, departure: null })

  const { t } = useI18n()

  return (
    <div className="max-w-7xl mx-auto px-6 my-4 md:grid  md:grid-cols-2 md:mt-16">
      <div className="mb-8 mx-auto md:my-auto md:px-4">
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
          When would you like to stay with us?
        </h1>
        <form action="">
          <DateInput
            placeholder={'Arrival Date'}
            className="text-center placeholder-blue-500"
            onChange={(d: Date) => {
              setDates({ ...dates, arrival: d })
            }}
            selected={dates.arrival}
            value={dates.arrival?.toLocaleDateString()}
          />
          <DateInput
            placeholder={'Departure Date'}
            className="text-center placeholder-blue-500"
            onChange={(d: Date) => {
              setDates({ ...dates, departure: d })
            }}
            selected={dates.departure}
            value={dates.departure?.toLocaleDateString()}
          />
          <Button>Show availability</Button>
        </form>
      </Card>
    </div>
  )
}

export default Home
