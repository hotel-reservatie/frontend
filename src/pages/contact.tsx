import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import router from 'next/router'
import { useState } from 'react'
import FormItem from 'src/classes/FormItem'

const Button = dynamic(() => import('src/components/button'))
const Card = dynamic(() => import('src/components/card'))
const Form = dynamic(() => import('src/components/form'))
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))
const Translater = dynamic(() => import('src/components/translater'))

const Contact = () => {
  const [submitting, setSubmitting] = useState(false)
  const formItems = [
    new FormItem({
      name: 'firstname',
      label: 'First name',
      id: 'firstname',
      placeholder: 'John',
    }),
    new FormItem({
      name: 'lastname',
      label: 'Last name',
      id: 'lastname',
      placeholder: 'Doe',
    }),
    new FormItem({
      name: 'email',
      label: 'Email',
      id: 'email',
      placeholder: 'johndoe@mail.com',
      type: 'email',
    }),
    new FormItem({
      name: 'question',
      label: 'Question',
      id: 'question',
      type: 'text-area',
      rows: 4,
    }),
  ]

  function handleSubmit() {
    router.push('/')
  }

  function setSubmit() {
    setSubmitting(true)
  }

  return (
    <PageLayout>
      <div className="min-h-full pt-12">
        <Card>
          <h1 className="font-semibold text-2xl leading-normal mb-6">
            {'Contact'}
          </h1>
          <Form
            submitting={submitting}
            setSubmitting={setSubmitting}
            formItems={formItems}
            onSubmit={handleSubmit}
          />

          <Button onClick={setSubmit}>
            <Translater>{'Send'}</Translater>
          </Button>
        </Card>
      </div>
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Contact
