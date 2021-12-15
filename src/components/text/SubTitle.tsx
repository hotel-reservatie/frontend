import React, { FunctionComponent } from 'react'

const SubTitle = ({
  children,
  className,
}: {
  children: any
  className?: String | undefined
}) => {
  return (
    <h2
      className={` mb-8 text-2xl font-semibold text-blue-600 ${
        className ? className : ''
      }`}
    >
      {children}
    </h2>
  )
}

export default SubTitle
