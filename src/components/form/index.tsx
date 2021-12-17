import React, { FormEvent, FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import FormItem, { FormItemOption } from 'src/classes/FormItem'
import Dropdown from '../dropdown'
import Input from '../input'
import DateInput from '../input/DateInput'
import TextArea from '../input/TextArea'

interface FormProps {
  formItems: Array<FormItem>
  rows?: number
  cols?: number
  rowGap?: number
  colGap?: number
  submitting?: boolean
  setSubmitting?: React.Dispatch<React.SetStateAction<boolean>>
  onItemChange?: any
  onSubmit?: any
  className?: string
}

const findIndexByName = (arr: FormItem[], searchName: string) => {
  return arr.findIndex(({ name }) => name === searchName)
}

const Form: FunctionComponent<FormProps> = ({
  formItems,
  cols = 1,
  rows,
  rowGap = 4,
  colGap = 2,
  onSubmit,
  submitting,
  setSubmitting,
  onItemChange,
  className = '',
}) => {
  const [items, setItems] = useState<Array<FormItem>>(formItems)

  function onFormItemChange(e: FormEvent<HTMLInputElement>) {
    const index = findIndexByName(items, e.currentTarget.name)

    if (index > -1) {
      const newItems = [
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.currentTarget.value }),
        ...items.slice(index + 1),
      ]
      if (onItemChange) onItemChange(newItems[index])

      setItems(newItems)
    }
  }

  function handleDropdownChange(e: FormItemOption, name: string) {
    const index = findIndexByName(items, name)
    if (index > -1) {
      const newItems = [
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.id }),
        ...items.slice(index + 1),
      ]
      if (onItemChange) onItemChange(newItems[index])
      setItems(newItems)
    }
  }

  function handleDateChange(d: Date, index: number) {
    const newItems = [
      ...items.slice(0, index),
      new FormItem({ ...items[index], value: d }),
      ...items.slice(index + 1),
    ]
    if (onItemChange) {
      onItemChange(newItems[index])
    }
    setItems(newItems)
  }

  function handleTextAreaChange(e: FormEvent<HTMLTextAreaElement>) {
    const index = findIndexByName(items, e.currentTarget.name)

    if (index > -1) {
      const newItems = [
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.currentTarget.value }),
        ...items.slice(index + 1),
      ]
      if (onItemChange) onItemChange(newItems[index])

      setItems(newItems)
    }
  }

  function isEmpty(formItem: FormItem, index: number) {
    if (formItem.required) {
      if (formItem.value) {
        return !(formItem.value.trim().length > 0)
      } else {
        return true
      }
    }
    return false
  }

  function isValidEmail(fi: FormItem) {
    const re = /\S+@\S+\.\S+/
    return re.test(fi.value)
  }

  function formHasErrors(formItems: Array<FormItem>) {
    let counter = 0
    let password = ''
    const newItems = formItems.map((item, index) => {
      if (isEmpty(item, index)) {
        item.faulty = 'true'
        item.errormessage = 'Verplicht!'
        counter++
        return item
      } else if (item.type === 'email' && !isValidEmail(item)) {
        counter++
        item.faulty = 'true'
        item.errormessage = 'Geen geldig e-mail'
        return item
      } else if (item.id === 'password') {
        password = item.value
      } else if (item.id === 'repeatpassword' && password !== item.value) {
        item.faulty = 'true'
        item.errormessage = 'Wachtwoorden komen niet overeen'
        item.value = ''
        counter++
        return item
      }
      item.faulty = 'false'
      item.errormessage = undefined
      return item
    })

    setItems(newItems)

    if (counter > 0) {
      return true
    }
    return false
  }

  function dynamicRowCols(amount: number | undefined, type: 'rows' | 'cols') {
    return `grid-${type}-${amount}`
  }

  function dynamicGaps(amount: number | undefined, type: 'x' | 'y') {
    return `gap-${type}-${amount}`
  }

  function handleEnterKeyPress(e: React.KeyboardEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement
    if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
      if (setSubmitting) setSubmitting(true)
    }
  }

  useEffect(() => {
    function handleSubmit() {
      if (formHasErrors(items)) {
        console.log('form has errors')
      } else {
        onSubmit(items)
      }
      if (setSubmitting) setSubmitting(false)
    }
    if (submitting) {
      handleSubmit()
    }
  }, [submitting])

  const formStyling = classNames(
    'grid items-end',
    { [dynamicGaps(colGap, 'x')]: colGap },
    { [dynamicGaps(rowGap, 'y')]: rowGap },
    { [dynamicRowCols(cols, 'cols')]: cols },
    { [dynamicRowCols(rows, 'rows')]: rows },
    className,
  )

  return (
    <form className={formStyling} noValidate onKeyPress={handleEnterKeyPress}>
      {items.map(({ value, className, ...item }, index) => {
        if (item.type === 'date') {
          return (
            <DateInput
              key={`dateinput-${index}`}
              onChange={(d: Date) => handleDateChange(d, index)}
              value={items[index].value}
              className={className}
              selected={items[index].value}
              {...item}
            />
          )
        } else if (
          item.type === 'dropdown' ||
          item.type === 'dropdown-multi-select'
        ) {
          return (
            <Dropdown
              key={`dropdown-${index}`}
              options={
                item.options ?? [{ id: '', name: 'option array required' }]
              }
              onChange={handleDropdownChange}
              placeholder={item.placeholder ?? 'Placeholder is required'}
              name={item.name ?? 'name is required'}
              multiSelect={item.type === 'dropdown-multi-select'}
            />
          )
        } else if (item.type === 'text-area') {
          return (
            <TextArea
              key={`textarea-${index}`}
              onChange={handleTextAreaChange}
              value={items[index].value}
              errormessage={item.errormessage}
              faulty={items[index].faulty}
              className={className}
              {...item}
            />
          )
        } else {
          return (
            <Input
              key={`input-${index}`}
              onChange={onFormItemChange}
              value={items[index].value}
              errormessage={item.errormessage}
              faulty={items[index].faulty}
              className={className}
              {...item}
            />
          )
        }
      })}
    </form>
  )
}

// usage with useState:
//  <Form
//    onSubmit={onFormSubmit}
//    setSubmitting={setSubmitting}
//    submitting={submitting}
//    cols={2}
//    formItems={formItems}
//  />

export default Form
