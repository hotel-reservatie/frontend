import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useFirebase from 'src/hooks/useFirebase'
import { useRouter } from 'next/router'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Card from 'src/components/card'

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
        <h1 className="font-semibold text-2xl leading-normal mb-6">Login</h1>
        <form onSubmit={loginUser}>
          <Input
            label={'Email address'}
            autoComplete="email"
            onChange={onInputChange}
            placeholder="eg. johndoe@gmail.com"
          />

          <Input
            label={'Password'}
            autoComplete="password"
            onChange={onInputChange}
          />

          <Button>Login</Button>
        </form>

        <p className="text-sm text-center text-blue-400 mt-12">
          I don't have a login, let me{' '}
          <Link href="/register">
            <a className="underline focus:outline-none focus-visible:ring">
              register
            </a>
          </Link>
          .
        </p>
      </Card>
    </div>
  )
}

export default Login
