import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import router from 'next/router'
import { useState } from 'react'
import FormItem from 'src/classes/FormItem'
import Button from 'src/components/button'
import Card from 'src/components/card'
import Form from 'src/components/form'
import PageLayout from 'src/components/layout/PageLayout'
import Translater from 'src/components/translater'

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
