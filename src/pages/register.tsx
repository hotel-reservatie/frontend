import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import Card from 'src/components/card'
import useFirebase from 'src/hooks/useFirebase'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Subtext from 'src/components/text'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from 'src/providers/authProvider'

const Register = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    'repeat-pw': '',
  })

  const { createUser } = useAuth()

  function signInUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // testjonas@test.be --> testfirebase
    // login(credentials.email, credentials.password)
    createUser(credentials.email, credentials.password)
    console.log(credentials)
    // router.push('/')
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.id === 'username' ||
      'email' ||
      'password' ||
      'repeat-pw'
    ) {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  return (
    <div className="min-h-full pt-12 pb-12">
      <Card>
        <h1 className="font-semibold text-2xl leading-normal mb-6">
          {t('register')}
        </h1>
        <form onSubmit={signInUser}>
          <Input
            label={t('username')}
            autoComplete="username"
            onChange={onInputChange}
            id="username"
          />

          <Input
            label={t('email.address')}
            autoComplete="email"
            onChange={onInputChange}
            placeholder={t('email.placeholder')}
            id="email"
          />

          <Input
            label={t('password')}
            autoComplete="password"
            onChange={onInputChange}
            type="password"
            id="password"
          />

          <Input
            label={t('password.repeat')}
            autoComplete="password"
            onChange={onInputChange}
            type="password"
            id="repeat-pw"
          />

          <Button>Register</Button>
        </form>

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
