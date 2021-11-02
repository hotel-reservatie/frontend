import React, { useState } from 'react'
import useFirebase from 'src/hooks/useFirebase'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login } = useFirebase()

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'email' || 'password') {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="mx-auto max-w-lg p-12 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h1 className="font-semibold text-4xl leading-normal mb-6">Login</h1>
        <form onSubmit={loginUser}>
          <label className="font-bold block mb-3" htmlFor="email">
            Email address
          </label>
          <input
            autoComplete="email"
            onChange={onInputChange}
            className="
            px-3
            py-2
            mb-6
            rounded
            border border-gray-300
            w-full
            focus:outline-none
            focus-visible:ring
            dark:bg-gray-900
          "
            type="text"
            id="email"
          />

          <label className="font-bold block mb-3" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="password"
            onChange={onInputChange}
            className="
            px-3
            py-2
            mb-6
            rounded
            border border-gray-300
            w-full
            focus:outline-none
            focus-visible:ring
            dark:bg-gray-900
          "
            type="password"
            id="password"
          />

          <button
            className="
            bg-black
            text-white
            py-2
            rounded
            w-full
            font-semibold
            focus:outline-none
            focus-visible:ring
          "
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-12">
          I don't have a login, let me
          {/* <RouterLink
          className="underline focus:outline-none focus-visible:ring"
          to="/register"
          >register</RouterLink
        >. */}
          .
        </p>
      </div>
    </div>
  )
}

export default Login
