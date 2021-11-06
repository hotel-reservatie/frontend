import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import Card from 'src/components/card'
import useFirebase from 'src/hooks/useFirebase'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Subtext from 'src/components/text'

const Register = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    emailaddress: '',
    password: '',
    repeatpassword: '',
  })

  const { createUser, user } = useFirebase()

  function signInUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // testjonas@test.be --> testfirebase
    // login(credentials.email, credentials.password)
    console.log(credentials)
    // router.push('/')
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.id === 'username' ||
      'emailaddress' ||
      'password' ||
      'repeatpassword'
    ) {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  return (
    <div className="min-h-full pt-12 pb-12">
      <Card>
        <h1 className="font-semibold text-2xl leading-normal mb-6">Register</h1>
        <form onSubmit={signInUser}>
          <Input
            label="Username"
            autoComplete="username"
            onChange={onInputChange}
          />

          <Input
            label="Email address"
            autoComplete="email"
            onChange={onInputChange}
            placeholder="eg. johndoe@gmail.com"
          />

          <Input
            label="Password"
            autoComplete="password"
            onChange={onInputChange}
            type="password"
          />

          <Input
            label="Repeat password"
            autoComplete="password"
            onChange={onInputChange}
            type="password"
          />

          <Button>Register</Button>
        </form>

        <Subtext>
          Already have an account?{' '}
          <Link href="/login">
            <a className="underline focus:outline-none focus-visible:ring">
              Login
            </a>
          </Link>
          .
        </Subtext>
      </Card>
    </div>
  )
}

export default Register
