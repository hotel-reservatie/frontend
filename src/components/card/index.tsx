import React, { FunctionComponent } from 'react'

interface CardProps {
  className?: string
}

const Card: FunctionComponent<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`p-4 mx-auto max-w-xs sm:max-w-2xl sm:p-12  bg-white  shadow  rounded-xl ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
