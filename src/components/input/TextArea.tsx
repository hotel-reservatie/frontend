import React, { FunctionComponent } from 'react'
import classNames from 'classnames/bind'

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  id?: string
  faulty?: 'true' | 'false'
  errormessage?: string
  submitting?: boolean
}

const TextArea: FunctionComponent<InputProps> = ({
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
    'px-4 py-4 mb-4 rounded-xl border border-blue-400 bg-blue-100 w-full focus:outline-none focus-visible:ring focus-visible:ring-blue-50 placeholder-blue-400 resize-none',
    {
      'border-red-400 focus-visible:ring-red-50 placeholder-red-400 bg-red-100':
        faulty === 'true',
    },
  )

  return (
    <div className={className}>
      <span className="flex justify-between items-center">
        <label className={labelStyling} htmlFor={id}>
          {label ?? ''}
        </label>
        {faulty && errormessage && (
          <p className={classNames(labelStyling, 'text-xs')}>{errormessage}</p>
        )}
      </span>
      <textarea
        autoComplete={autoComplete}
        onChange={onChange}
        className={inputStyling}
        placeholder={placeholder}
        id={id}
        {...props}
      />
    </div>
  )
}

export default TextArea
