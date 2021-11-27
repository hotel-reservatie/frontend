import React, { FormEvent, FunctionComponent, useEffect, useState } from 'react'
import FormItem from 'src/classes/FormItem'
import Input from '../input'
import DateInput from '../input/DateInput'

interface FormProps {
  formItems: Array<FormItem>
  onSubmit: any
  rows?: number
  cols?: number
  submitting: boolean
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: FunctionComponent<FormProps> = ({
  formItems,
  cols,
  rows,
  onSubmit,
  submitting,
  setSubmitting,
}) => {
  const [items, setItems] = useState<Array<FormItem>>(formItems)

  useEffect(() => {
    console.log(submitting)

    if (submitting) {
      handleSubmit()
    }
  }, [submitting])

  function onFormItemChange(e: FormEvent<HTMLInputElement>) {
    const index = items.findIndex(({ name }) => name === e.currentTarget.name)
    if (index > -1) {
      setItems([
        ...items.slice(0, index),
        new FormItem({ ...items[index], value: e.currentTarget.value }),
        ...items.slice(index + 1),
      ])
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
      className={`grid items-end gap-2 ${cols ? `grid-cols-${cols}` : ''} ${
        rows ? `grid-rows-${rows}` : ''
      }`}
      noValidate
    >
      {items.map(({ value, ...item }, index) => {
        if (item.type === 'date') {
          return (
            <DateInput
              key={`dateinput-${index}`}
              onChange={() => onFormItemChange}
              value={formItems[index].value}
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
