import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import ProfileNavigation from 'src/components/navigation/profileNavigation'
import PageTitle from 'src/components/text/PageTitle'

const Info = () => {
    return (
        <ProfileNavigation title='Customer Information'>

        </ProfileNavigation>
    )
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  })

export default Info
