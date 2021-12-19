import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Subtext from 'src/components/text'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useAuth } from 'src/providers/authProvider'
import FormItem from 'src/classes/FormItem'
import Form from 'src/components/form'
import Translater from 'src/components/translater'

enum FirebaseError {
  wrongPassword = 'auth/wrong-password',
  userNotFound = 'auth/user-not-found',
  tooManyRequests = 'auth/too-many-requests'
}

const Login = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | undefined>()
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login, user } = useAuth()

  useEffect(() => {
    console.log(user)
  }, [user])

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'email' || 'password') {
      setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }
  }

  function handleLoginClick() {
    setSubmitting(true)
  }

  const showError = (errCode: string) => {
    setIsLoading(false)

    console.log(errCode);
    
    if(errCode == FirebaseError.wrongPassword){
      setLoginError('Wrong password!')
    }

    if(errCode == FirebaseError.userNotFound){
      setLoginError('This email address is not in use!')
    }

    if(errCode == FirebaseError.tooManyRequests){
      setLoginError('Too many requests')
    }
    
  }

  function handleSubmit(items: Array<FormItem>) {
    setIsLoading(true)
    login(items[0].value, items[1].value)
      .then(r => {
        console.log(r);
        
        if (r.success) {
          router.push('/')
        }else{
          showError(r.errCode as string)
        }
      })
      .catch(e => {
        setLoginError('Something went wrong')
      })
  }

  const formItems = [
    new FormItem({
      label: 'email.address',
      id: 'email',
      name: 'email',
      placeholder: 'email.placeholder',
      autoComplete: 'email',
      type: 'email',
    }),
    new FormItem({
      label: 'Password',
      id: 'password',
      type: 'password',
      name: 'password',
    }),
  ]

  return (
    <div className="min-h-full pt-12">
      <Card>
        <h1 className="font-semibold text-2xl leading-normal mb-6">
          {t('login')}
        </h1>
        <Form
          submitting={submitting}
          setSubmitting={setSubmitting}
          formItems={formItems}
          onSubmit={handleSubmit}
          externalError={loginError}
        />
        {/* <form onSubmit={loginUser}>
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
          /> */}
        {isLoading ? (
          <p className=" text-center">Please wait...</p>
        ) : (
          <Button onClick={handleLoginClick}>{t('login')}</Button>
        )}
        {/* </form> */}

        <p className="text-sm text-center text-blue-400 mt-12">
          {t('subtext.register')}{' '}
          <Link href="/register">
            <a className="underline focus:outline-none focus-visible:ring">
              {t('loginpage.register')}
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

export default Login
