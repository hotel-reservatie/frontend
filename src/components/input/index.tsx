import React, { FunctionComponent } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: FunctionComponent<InputProps> = ({
  label,
  type,
  autoComplete,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <>
      <label
        className="block mb-1 text-blue-600"
        htmlFor={label.replace(/ +/g, '')}
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        onChange={onChange}
        className="
            px-4
            py-4
            mb-4
            rounded-full
            border border-blue-400
            bg-blue-100
            w-full
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-50
            placeholder-blue-400
          "
        type={type}
        id={label.replace(/ +/g, '')}
        placeholder={placeholder}
        {...props}
      />
    </>
  )
}

export default Input
