import React, { FunctionComponent } from 'react'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('common')
  const labelStyling = classNames(
    'block text-blue-600',
    { 'mb-1': label },
    { 'text-red-600': faulty === 'true' },
  )
  const inputStyling = classNames(
    'px-4 py-4 mb-4 rounded-full border w-full focus:outline-none focus-visible:ring ',
    {
      'border-blue-400 bg-blue-100 focus-visible:ring-blue-50 placeholder-blue-400':
        faulty === 'false' || faulty === undefined,
    },
    {
      'border-red-400 focus-visible:ring-red-50 placeholder-red-400 bg-red-100':
        faulty === 'true',
    },
  )

  return (
    <div className={className}>
      <span className="flex justify-between items-center">
        <label className={labelStyling} htmlFor={id}>
          {t(`${label ?? ''}`)}
        </label>
        {faulty && errormessage && (
          <p className={classNames(labelStyling, 'text-xs')}>{errormessage}</p>
        )}
      </span>
      <input
        autoComplete={autoComplete}
        onChange={onChange}
        className={inputStyling}
        type={type}
        placeholder={t(`${placeholder}`)}
        id={id}
        {...props}
      />
    </div>
  )
}

export default Input
