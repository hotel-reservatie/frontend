import React, { FunctionComponent } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`text-white
            py-4
            bg-blue-700
            hover:bg-blue-600
            rounded-full
            w-full
            font-semibold
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-200
            ${className} disabled:bg-blue-400 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
