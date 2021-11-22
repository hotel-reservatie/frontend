import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useFirebase from 'src/hooks/useFirebase'
import { useRouter } from 'next/router'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Subtext from 'src/components/text'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useAuth } from 'src/providers/authProvider'

const Login = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login, user } = useAuth()

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login(credentials.email, credentials.password)
    router.push('/')
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'email' || 'password') {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  return (
    <div className="min-h-full pt-12">
      <Card>
        <h1 className="font-semibold text-2xl leading-normal mb-6">
          {t('login')}
        </h1>
        <form onSubmit={loginUser}>
          <Input
            label={t('email.address')}
            id="email"
            autoComplete="email"
            onChange={onInputChange}
            placeholder={t('email.placeholder')}
          />

          <Input
            label={t('password')}
            id="password"
            autoComplete="password"
            onChange={onInputChange}
            type="password"
          />

          <Button>{t('login')}</Button>
        </form>

        <Subtext>
          {t('subtext.register')}{' '}
          <Link href="/register">
            <a className="underline focus:outline-none focus-visible:ring">
              {t('loginpage.register')}
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

export default Login
