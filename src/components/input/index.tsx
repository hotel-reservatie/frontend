import React, { FunctionComponent } from 'react'
import classNames from 'classnames/bind'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  faulty?: 'true' | 'false'
  errormessage?: string
  submitting?: boolean
}

const Input: FunctionComponent<InputProps> = ({
  label,
  type = 'text',
  autoComplete = 'off',
  onChange,
  placeholder,
  id,
  className,
  faulty,
  errormessage,
  submitting = false,
  ...props
}) => {
  const labelStyling = classNames(
    'block text-blue-600',
    { 'mb-1': label },
    { 'text-red-600': faulty === 'true' },
  )
  const inputStyling = classNames(
    'px-4 py-4 my-1 rounded-full border border-blue-400 bg-blue-100 w-full focus:outline-none focus-visible:ring focus-visible:ring-blue-50 placeholder-blue-400',
    {
      'border-red-400 focus-visible:ring-red-50 placeholder-red-400 bg-red-100':
        faulty === 'true',
    },
  )

  return (
    <div className={className}>
      <label className={labelStyling} htmlFor={id}>
        {label ?? ''}
      </label>
      <input
        autoComplete={autoComplete}
        onChange={onChange}
        className={inputStyling}
        type={type}
        placeholder={placeholder}
        id={id}
        {...props}
      />
    </div>
  )
}

export default Input
