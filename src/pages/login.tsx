import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useFirebase from 'src/hooks/useFirebase'
import { useRouter } from 'next/router'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Subtext from 'src/components/text'

import t from 'src/utils/i18n'

const Login = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login, user } = useFirebase()

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // testjonas@test.be --> testfirebase
    login(credentials.email, credentials.password)
    router.push('/')
  }

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
            autoComplete="email"
            onChange={onInputChange}
            placeholder={t('email.placeholder')}
          />

          <Input
            label={t('password')}
            autoComplete="password"
            onChange={onInputChange}
          />

          <Button>{t('login')}</Button>
        </form>

        <Subtext>
          {t('login.subtext')}{' '}
          <Link href="/register">
            <a className="underline focus:outline-none focus-visible:ring">
              {t('login.register')}
            </a>
          </Link>
          .
        </Subtext>
      </Card>
    </div>
  )
}

export default Login
