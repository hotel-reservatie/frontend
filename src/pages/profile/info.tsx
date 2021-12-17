import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import FormItem from 'src/classes/FormItem'
import Button from 'src/components/button'
import CustomerInfoSection from 'src/components/customerInfo'
import ProfileNavigation from 'src/components/navigation/profileNavigation'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { useAuth } from 'src/providers/authProvider'
import {
  useGetUserInfoLazyQuery,
  useGetUserInfoQuery,
  UserInput,
  useUpdateUserMutation,
} from 'src/schema'

const Info = () => {

  const { user } = useAuth();

  const [getUserInfo, { data, refetch }] = useGetUserInfoLazyQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [updateUserInfo] = useUpdateUserMutation()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setSubmitting(true)
  }

  const handleSubmit = (e: FormItem[]) => {
    const user: UserInput = {}

    user.firstName = e[0].value
    user.lastName = e[1].value
    user.reservationEmail = e[2].value
    user.phone = e[3].value
    user.address = e[4].value
    user.city = e[5].value
    user.postal = parseInt(e[6].value)

    updateUserInfo({ variables: { user: user } }).then(() => {
      setIsEditing(false)
      if (refetch) refetch()
    })
  }

  useEffect(() => {
    if(user){
      getUserInfo();
    }
    
  }, [user])
  return (
    <ProfileNavigation title="Profile">
      {data ? (
        <div>
          <div className="flex justify-between items-center gap-4 mb-8">
            <SubTitle className="mb-0">Customer Info</SubTitle>
            {!isEditing ? (
              <MdEdit
                onClick={handleEdit}
                className=" text-blue-300 hover:text-blue-700 hover:cursor-pointer hover:scale-105 transition-all"
                size={24}
              />
            ) : null}
          </div>
          <CustomerInfoSection
            userInfo={data?.getUserInfo as UserInput}
            isEditing={isEditing}
            submitting={submitting}
            setSubmitting={setSubmitting}
            onSubmit={handleSubmit}
          />
          {isEditing ? <Button onClick={handleSave}>Save</Button> : null}
        </div>
      ) : null}
    </ProfileNavigation>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Info
