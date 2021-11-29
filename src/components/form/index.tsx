import React, { FormEvent, FunctionComponent, useEffect, useState } from 'react'
import FormItem, { FormItemOption } from 'src/classes/FormItem'
import Dropdown from '../dropdown'
import Input from '../input'
import DateInput from '../input/DateInput'

interface FormProps {
  formItems: Array<FormItem>
  rows?: number
  cols?: number
  submitting: boolean
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  onItemChange?: any
  onSubmit?: any
}

const findIndexByName = (arr: FormItem[], searchName: string) => {
  return arr.findIndex(({ name }) => name === searchName)
}

const Form: FunctionComponent<FormProps> = ({
  formItems,
  cols,
  rows,
  onSubmit,
  submitting,
  setSubmitting,
  onItemChange,
}) => {
  const [items, setItems] = useState<Array<FormItem>>(formItems)

  function onFormItemChange(e: FormEvent<HTMLInputElement>) {
    const index = findIndexByName(items, e.currentTarget.name)
    console.log(e.currentTarget.name)

    if (index > -1) {
      const newItems = [
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.currentTarget.value }),
        ...items.slice(index + 1),
      ]
      onItemChange(newItems)
      setItems(newItems)
    }
  }

  function handleDropdownChange(e: FormItemOption, name: string) {
    const index = findIndexByName(items, name)
    if (index > -1) {
      const newItems = [
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.name }),
        ...items.slice(index + 1),
      ]
      onItemChange(newItems)
      setItems(newItems)
    }
  }

  function handleDateChange(d: Date, index: number) {
    const newItems = [
      ...items.slice(0, index),
      new FormItem({ ...items[index], value: d }),
      ...items.slice(index + 1),
    ]
    onItemChange(newItems)
    setItems(newItems)
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
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (fi.type === 'email') return String(fi.value).toLowerCase().match(re)
    else return false
  }

  function formHasErrors(formItems: Array<FormItem>) {
    let counter = 0
    const newItems = formItems.map((item, index) => {
      if (isEmpty(item, index)) {
        if (item.type === 'email' && !isValidEmail(item)) {
          counter++
          item.faulty = 'true'
          item.errormessage = 'Geen geldig e-mail'
          return item
        }
        item.faulty = 'true'
        item.errormessage = 'Verplicht!'
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

  function handleSubmit() {
    if (formHasErrors(items)) {
      console.log('form has errors')
    } else {
      onSubmit(items)
    }
    setSubmitting(false)
  }

  return (
    <form
      className={`grid items-end ${cols ? `grid-cols-${cols}` : ''} gap-2  ${
        rows ? `grid-rows-${rows}` : ''
      }`}
      noValidate
    >
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
        } else if (item.type === 'dropdown') {
          return (
            <Dropdown
              key={`dropdown-${index}`}
              options={
                item.options ?? [{ id: 1, name: 'option array required' }]
              }
              onChange={handleDropdownChange}
              placeholder={item.placeholder ?? 'Placeholder is required'}
              name={item.name ?? 'name is required'}
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
