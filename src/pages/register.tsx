import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import useFirebase from 'src/hooks/useFirebase'

const Register = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const { createUser, user } = useFirebase()

  function signInUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // testjonas@test.be --> testfirebase
    // login(credentials.email, credentials.password)
    console.log(credentials)
    router.push('/')
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.id === 'username' ||
      'email' ||
      'password' ||
      'password2'
    ) {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  return (
    <div className="min-h-full pt-12 pb-12">
      <div className="p-4 mx-auto max-w-xs sm:max-w-2xl  sm:p-12  bg-white  shadow  rounded-xl">
        <h1 className="font-semibold text-2xl leading-normal mb-6">Register</h1>
        <form onSubmit={signInUser}>
          <label className="block mb-1 text-blue-600" htmlFor="username">
            Username
          </label>
          <input
            autoComplete="username"
            onChange={onInputChange}
            className="
            px-4
            py-4
            mb-4
            rounded-full
            border border-blue-400
            bg-blue-100
            w-full
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-50
            placeholder-blue-400
          "
            type="text"
            id="username"
          />
          <label className="block mb-1 text-blue-600" htmlFor="email">
            Email address
          </label>
          <input
            autoComplete="email"
            onChange={onInputChange}
            className="
            px-4
            py-4
            mb-4
            rounded-full
            border border-blue-400
            bg-blue-100
            w-full
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-50
            placeholder-blue-400
          "
            type="text"
            id="email"
            placeholder="eg. johndoe@gmail.com"
          />

          <label className="block mb-1 text-blue-600" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="password"
            onChange={onInputChange}
            className="
            px-4
            py-4
            mb-4
            rounded-full
            border border-blue-400
            bg-blue-100
            w-full
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-50
          "
            type="password"
            id="password"
          />
          <label className="block mb-1 text-blue-600" htmlFor="password2">
            Repeat Password
          </label>
          <input
            autoComplete="password"
            onChange={onInputChange}
            className="
            px-4
            py-4
            mb-10
            rounded-full
            border border-blue-400
            bg-blue-100
            w-full
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-50
          "
            type="password"
            id="password2"
          />

          <button
            className="
            text-white
            py-4
            bg-blue-700
            hover:bg-blue-600
            rounded-full
            w-full
            font-semibold
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-blue-200
          "
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-blue-400 mt-12">
          Already have an account?{' '}
          <Link href="/login">
            <a className="underline focus:outline-none focus-visible:ring">
              Login
            </a>
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register
