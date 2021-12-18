import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Translater from 'src/components/translater'

const About = () => {
  return (
    <PageLayout className="flex flex-col h-full">
      <PageTitle>Hotel MCT</PageTitle>
      <div className="grid grid-cols-2 place-items-center gap-x-4">
        <div>
          <p>
            <Translater>{'about.text'}</Translater>
          </p>
        </div>
        <div className="relative h-full w-full">
          <Image
            src="/image/hotel.png"
            layout="fill" // required
            objectFit="contain" // change to suit your needs
            priority
          />
        </div>
      </div>
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default About
