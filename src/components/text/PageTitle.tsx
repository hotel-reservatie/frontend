import React, { FunctionComponent } from 'react'

const PageTitle: FunctionComponent = ({ children }) => {
  return <h1 className=" text-3xl font-bold text-blue-600 mb-8">{children}</h1>
}

export default PageTitle
