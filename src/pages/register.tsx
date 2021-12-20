import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from 'src/providers/authProvider'
import { useRouter } from 'next/router'

import FormItem from 'src/classes/FormItem'
import dynamic from 'next/dynamic'

const Link = dynamic(() => import('next/link'))
const Form = dynamic(() => import('src/components/form'))
const Card = dynamic(() => import('src/components/card'))
const Button = dynamic(() => import('src/components/button'))

const Register = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { createUser } = useAuth()

  function onStartSubmit() {
    setSubmitting(true)
  }

  function handleSubmit(items: Array<FormItem>) {
    setIsLoading(true)
    createUser(items[1].value, items[2].value, items[0].value).then(r => {
      if (r) {
        router.push('/')
      }
    })
  }

  const formItems = [
    new FormItem({
      label: 'username',
      id: 'username',
      name: 'username',
    }),
    new FormItem({
      label: 'email.address',
      name: 'email',
      id: 'email',
      placeholder: 'email.placeholder',
      type: 'email',
    }),
    new FormItem({
      label: 'Password',
      name: 'password',
      id: 'password',
      type: 'password',
    }),
    new FormItem({
      label: 'password.repeat',
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
        {isLoading ? (
          <p className=" text-center">Please wait...</p>
        ) : (
          <Button onClick={onStartSubmit}>Register</Button>
        )}
        <p className="text-sm text-center text-blue-400 mt-12">
          {t('subtext.login')}{' '}
          <Link href="/login">
            <a className="underline focus:outline-none focus-visible:ring">
              {t('login')}
            </a>
          </Link>
          .
        </p>
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
