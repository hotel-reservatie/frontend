import React, { FunctionComponent } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`p-4 mx-auto max-w-xs sm:max-w-2xl bg-white  shadow  rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
