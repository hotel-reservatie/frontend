import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

export default function Custom404() {
  return (
    <div className="min-h-full pt-40">
      <div className="mx-auto max-w-xs text-center">
        <h1 className=" font-semibold">404 - Page Not Found</h1>
      </div>
    </div>
  )
}
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
