import React from 'react'
import type { NextPage } from 'next'
import Header from 'src/components/header'

const Home: NextPage = () => {
  return (
    <div className="mx-6 my-4">
      <h1 className="font-bold text-blue-700 mb-2">Welcome to Hotel MCT!</h1>
      <p className="text-blue-600 text-left leading-tight">
        We provide rooms for every type of vacation goer.
      </p>
      <p className="text-blue-600 text-left leading-tight">
        Have a look around!
      </p>

      <div>
        <h1>When would you like to stay with us</h1>
      </div>
    </div>
  )
}

export default Home
