import { useTranslation } from 'next-i18next'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateInputProps extends ReactDatePickerProps {
  placeholder?: string
  minDate?: Date
  className?: string
}
const DateInput: FunctionComponent<DateInputProps> = ({
  placeholder,
  minDate = new Date(),
  className,
  value,
  ...props
}) => {
  const [showIcon, setShowIcon] = useState(true)
  const datePickerRef = useRef<any>(null)
  const { t } = useTranslation('common')
  function onFocus() {
    setShowIcon(false)
  }

  function onBlur() {
    if (value !== undefined) {
      setShowIcon(false)
    } else {
      setShowIcon(true)
    }
  }

  return (
    <div className={className}>
      <DatePicker
        ref={datePickerRef}
        minDate={minDate}
        placeholderText={t(`${placeholder}`)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`
            relative
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
          `}
        {...props}
      />
      <span className={`${showIcon ? '' : 'hidden'} absolute z-10 -ml-12 mt-4`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#527FF7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </span>
    </div>
  )
}

export default DateInput
