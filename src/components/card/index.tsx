import React, { FunctionComponent } from 'react'

const Card: FunctionComponent = ({ children }) => {
  return (
    <div className="p-4 mx-auto max-w-xs sm:max-w-2xl sm:p-12  bg-white  shadow  rounded-xl">
      {children}
    </div>
  )
}

export default Card
