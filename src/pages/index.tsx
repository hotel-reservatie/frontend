import React, { useState } from 'react'
import type { NextPage } from 'next'
import Header from 'src/components/header'
import Card from 'src/components/card'
import DateInput from 'src/components/input/DateInput'

const Home: NextPage = () => {
  const [dates, setDates] = useState<{
    arrival: null | Date
    departure: null | Date
  }>({ arrival: null, departure: null })

  return (
    <div className="max-w-7xl mx-auto px-6 my-4 md:flex md:flex-row md:align-middle">
      <div className="mx-auto my-auto mb-8">
        <h1 className="font-bold text-blue-700 mb-2">Welcome to Hotel MCT!</h1>
        <p className="text-blue-600 text-left leading-tight">
          We provide rooms for every type of vacation goer.
        </p>
        <p className="text-blue-600 text-left leading-tight">
          Have a look around!
        </p>
      </div>

      <Card>
        <h1>When would you like to stay with us?</h1>
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
      </Card>
    </div>
  )
}

export default Home
