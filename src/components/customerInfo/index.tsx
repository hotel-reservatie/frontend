import React, { FunctionComponent, useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import FormItem from 'src/classes/FormItem'
import { UserInput } from 'src/schema/__generated-schema-types'
import Form from '../form'
import SubTitle from '../text/SubTitle'
import Translater from '../translater'

interface CustomerInfoSectionProps {
  userInfo: UserInput
  isEditing: boolean
  onSubmit: (e: FormItem[]) => void
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  submitting: boolean
  requiredFormFields?: boolean
}

interface CustomerInfoItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string
  value?: string | number
  className?: string
}

export const CustomerInfoItem: FunctionComponent<CustomerInfoItemProps> = ({
  title,
  value,
  className,
}) => {
  return (
    <div className={`${className} mb-4`}>
      <p className="text-blue-600 font-semibold">
        <Translater>{title}</Translater>
      </p>
      <p className=" text-blue-400">
        <Translater>{value ? value : 'Unknown'}</Translater>
      </p>
    </div>
  )
}

const CustomerInfoSection: FunctionComponent<CustomerInfoSectionProps> = ({
  userInfo,
  isEditing,
  submitting,
  onSubmit,
  setSubmitting,
  requiredFormFields = false,
}) => {
  const userInfoForm: Array<FormItem> = [
    new FormItem({
      label: 'First Name',
      placeholder: 'John',
      id: 'firstname',
      autoComplete: 'given-name',
      value: userInfo.firstName,
      name: 'firstname',
      className: 'col-span-2',
      required: requiredFormFields,
    }),
    new FormItem({
      label: 'Last Name',
      id: 'lastname',
      autoComplete: 'family-name',
      value: userInfo.lastName,
      placeholder: 'Doe',
      name: 'lastname',
      className: 'col-span-2',
      required: requiredFormFields,
    }),
    new FormItem({
      label: 'Billing Email',
      id: 'email',
      value: userInfo.reservationEmail,
      type: 'email',
      autoComplete: 'email',
      placeholder: 'Doe',
      name: 'email',
      className: 'col-span-2',
      required: requiredFormFields,
    }),
    new FormItem({
      label: 'Phone',
      id: 'phone',
      value: userInfo.phone,
      autoComplete: 'tel',
      name: 'phone',
      className: 'col-span-2',
      required: requiredFormFields,
    }),
    new FormItem({
      label: 'Address',
      id: 'address',
      value: userInfo.address,
      autoComplete: 'street-address',
      name: 'address',
      className: 'col-span-2',
      required: requiredFormFields,
    }),
    new FormItem({
      label: 'City',
      id: 'city',
      value: userInfo.city,
      autoComplete: 'address-level2',
      name: 'city',
      required: requiredFormFields,
    }),
    new FormItem({
      type: 'number',
      label: 'Postal Code',
      id: 'postal',
      value: userInfo.postal,
      autoComplete: 'postal-code',
      name: 'postal',
      required: requiredFormFields,
    }),
  ]

  if (!isEditing) {
    return (
      <div className="grid grid-cols-4">
        <CustomerInfoItem
          title="User Name"
          value={userInfo.userName as string}
          className="col-span-4"
        />
        <CustomerInfoItem
          title="First Name"
          value={userInfo.firstName as string}
          className="col-span-2"
        />
        <CustomerInfoItem
          title="Last Name"
          value={userInfo.lastName as string}
          className="col-span-2"
        />
        <CustomerInfoItem
          title="Billing Email"
          value={userInfo.reservationEmail as string}
          className="col-span-2"
        />
        <CustomerInfoItem
          title="Phone"
          value={userInfo.phone as string}
          className="col-span-2"
        />
        <CustomerInfoItem
          title="Address"
          value={userInfo.address as string}
          className="col-span-2"
        />
        <CustomerInfoItem
          title="City"
          value={userInfo.city as string}
          className="col-span-1"
        />
        <CustomerInfoItem
          title="Postal"
          value={userInfo.postal as number}
          className="col-span-1"
        />
      </div>
    )
  } else {
    return (
      <Form
        cols={4}
        rows={3}
        colGap={6}
        formItems={userInfoForm}
        onSubmit={onSubmit}
        submitting={submitting}
        setSubmitting={setSubmitting}
        className=" mb-4"
      />
    )
  }
}

export default CustomerInfoSection
