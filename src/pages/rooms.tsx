import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Rooms = () => {
  return <div></div>
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Rooms
