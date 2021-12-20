import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import {
  useGetUserInfoLazyQuery,
  UserInput,
  useUpdateUserMutation,
} from 'src/schema'

import FormItem from 'src/classes/FormItem'
import dynamic from 'next/dynamic'

const Button = dynamic(() => import('src/components/button'))
const CustomerInfoSection = dynamic(() => import('src/components/customerInfo'))
const NotSignedIn = dynamic(
  () => import('src/components/emptyPlaceholder/NotSignedIn'),
)
const ProfileNavigation = dynamic(
  () => import('src/components/navigation/profileNavigation'),
)
const SubTitle = dynamic(() => import('src/components/text/SubTitle'))

const Info = () => {
  const { user } = useAuth()

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
    if (user) {
      getUserInfo()
    }
  }, [user])
  return (
    <ProfileNavigation title="Profile">
      <Authenticated>
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
      </Authenticated>
      <NotAuthenticated>
        <NotSignedIn>Please sign in to view your profile...</NotSignedIn>
      </NotAuthenticated>
    </ProfileNavigation>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Info
