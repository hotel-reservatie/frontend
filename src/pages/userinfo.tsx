import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { Authenticated } from 'src/providers/authProvider'

const UserInfo = () => {



  return (
    <PageLayout>
      <PageTitle>Profile</PageTitle>
      <Authenticated>
        <SubTitle>Customer Information</SubTitle>
        <SubTitle>Favorites</SubTitle>
        <SubTitle>Customer Information</SubTitle>

      </Authenticated>
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default UserInfo
