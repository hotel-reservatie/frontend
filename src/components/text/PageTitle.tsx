import React, { FunctionComponent } from 'react'
import Translater from '../translater'

const PageTitle: FunctionComponent = ({ children }) => {
  return (
    <h1 className=" text-3xl font-bold text-blue-600 mb-8 whitespace-nowrap">
      <Translater>{children}</Translater>
    </h1>
  )
}

export default PageTitle
