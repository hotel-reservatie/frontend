import React, { FunctionComponent } from 'react'

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
  if (label) {
    return (
      <div className={className}>
        <label
          className={`block mb-1 text-blue-600 ${
            faulty === 'true' ? 'text-red-600' : undefined
          }`}
          htmlFor={label.replace(/ +/g, '').toLowerCase()}
        >
          {label}
        </label>
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          className={`px-4 py-4  rounded-full border border-blue-400 bg-blue-100 w-full focus:outline-none focus-visible:ring focus-visible:ring-blue-50 placeholder-blue-400
          ${
            faulty === 'true'
              ? 'border-red-400 focus-visible:ring-red-50 placeholder-red-400 bg-red-100'
              : undefined
          }`}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  } else {
    return (
      <div className={className}>
        <label></label>
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          className={`px-4 py-4 rounded-full border border-blue-400 bg-blue-100 w-full focus:outline-none focus-visible:ring focus-visible:ring-blue-50 placeholder-blue-400
          ${
            faulty === 'true'
              ? 'border-red-400 focus-visible:ring-red-50 placeholder-red-400 bg-red-100'
              : undefined
          }`}
          type={type}
          id={label ? label.replace(/ +/g, '').toLowerCase() : id}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
}

export default Input
