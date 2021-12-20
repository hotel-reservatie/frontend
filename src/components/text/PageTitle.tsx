import React, { FunctionComponent, HTMLAttributes } from 'react'
import Translater from '../translater'


const PageTitle: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({ children, className }) => {
  return (
    <h1 className={` text-3xl font-bold text-blue-600 mb-8 ${className}`}>
      <Translater>{children}</Translater>
    </h1>
  )
}

export default PageTitle
