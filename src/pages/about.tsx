import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PageTitle = dynamic(() => import('src/components/text/PageTitle'))
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))
const Image = dynamic(() => import('next/image'))
const Translater = dynamic(() => import('src/components/translater'))

const About = () => {
  return (
    <PageLayout className="flex flex-col h-full">
      <PageTitle>Hotel MCT</PageTitle>
      <div className="md:grid grid-cols-2 place-items-center gap-x-4">
        <div>
          <p>
            <Translater>{'text.about'}</Translater>
          </p>
        </div>
        <div className="relative w-full h-52 mt-16 md:mt-0">
          <Image
            src="/image/hotel.png"
            layout="fill" // required
            objectFit="contain" // change to suit your needs
            priority
            alt="hotel"
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
