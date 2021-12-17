import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const About = () => {
  return (
    <PageLayout className="flex flex-col h-full">
      <PageTitle>Hotel MCT</PageTitle>
      <div className="grid grid-cols-2 place-items-center gap-x-4">
        <div>
          <p>
            Vier sterren, 59 luxekamers: het Hotel MCT in Kortrijk is dé
            optelsom van comfort en klasse. De neoklassieke barokstijl van het
            imposante hoofdmijngebouw is een pronkstuk uit ons industriële
            verleden. In het heden kreeg het pand een trendy, toekomstgerichte
            invulling … Welkom in Hotel MCT! Te midden van weelderige fauna en
            flora en indrukwekkende waterpartijen nestelt Hotel MCT zich in het
            Kortrijkse groen. Unieke vergezichten vanop de mijnterrils en
            schachtbok brengen de herinnering aan het steenkoolmijnverleden
            dichterbij dan ooit. Als troefkaart is er de betoverende Franse tuin
            van het hotel, als schakel met de hoofdtoegangspoort naar het enige
            Nationale Park van België: een onvervalst wandelwalhalla. Verder zet
            je langs deze weg ook de stap naar een ander soort paradijs … Het
            shopparadijs Kortrijk Village! Daar word je 7 dagen op 7 verwelkomd
            in een pittoreske winkelsetting. Meer dan 100 luxueuze fashion- en
            lifestylemerken staan voor je klaar. Waar wacht je nog op?
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
