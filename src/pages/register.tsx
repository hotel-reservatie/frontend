import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import Card from 'src/components/card'
import Button from 'src/components/button'
import Subtext from 'src/components/text'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from 'src/providers/authProvider'
import FormItem from 'src/classes/FormItem'
import Form from 'src/components/form'

const Register = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)
  const { createUser } = useAuth()

  function onStartSubmit() {
    setSubmitting(true)
  }

  function handleSubmit(items: Array<FormItem>) {
    createUser(items[1].value, items[2].value, items[0].value)
    router.push('/')
  }

  const formItems = [
    new FormItem({
      label: t('username'),
      id: 'username',
      name: 'username',
    }),
    new FormItem({
      label: t('email.address'),
      name: 'email',
      id: 'email',
      placeholder: t('email.placeholder'),
      type: 'email',
    }),
    new FormItem({
      label: t('password'),
      name: 'password',
      id: 'password',
      type: 'password',
    }),
    new FormItem({
      label: t('password.repeat'),
      name: 'repeatpassword',
      id: 'repeatpassword',
      type: 'password',
    }),
  ]

  return (
    <div className="min-h-full pt-12 pb-12">
      <Card>
        <h1 className="font-semibold text-2xl leading-normal mb-6">
          {t('register')}
        </h1>
        <Form
          formItems={formItems}
          submitting={submitting}
          setSubmitting={setSubmitting}
          onSubmit={handleSubmit}
        />

        <Button onClick={onStartSubmit}>Register</Button>

        <Subtext>
          {t('subtext.login')}{' '}
          <Link href="/login">
            <a className="underline focus:outline-none focus-visible:ring">
              {t('login')}
            </a>
          </Link>
          .
        </Subtext>
      </Card>
    </div>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Register
