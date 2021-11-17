import { FunctionComponent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import localizedPrice from 'src/utils/localePrice'
import Button from 'src/components/button'

interface RoomCardProps {
  img: string | undefined | null
  title: string | undefined | null
  desc: string | undefined | null
  price: number | undefined | null
  size: number | undefined | null
  type: 'roomType' | 'room'
  loading: boolean
}

interface RoomCardHolderProps {
  img: string | undefined | null
  title: string | undefined | null
}

interface RoomCardTitleSectionProps {
  title: string | undefined | null
  desc: string | undefined | null
}

const RoomCardHolder: FunctionComponent<RoomCardHolderProps> = ({
  children,
  img,
  title,
}) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 my-8 items-center rounded-xl shadow bg-white">
      <div className="h-80 relative">
        <Image
          src={img ? img : '/not_found.svg'}
          alt={title ? title : 'Not found'}
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-l-xl"
        />
      </div>
      <div className="col-span-3 flex  flex-col px-8 h-full content-between justify-between">
        {children}
      </div>
    </div>
  )
}

const RoomCardTitleSection: FunctionComponent<RoomCardTitleSectionProps> = ({
  title,
  desc,
}) => {
  return (
    <div className="">
      <h2 className="font-bold text-2xl mt-8 mb-4">{title ? title : ''}</h2>
      <p className="max-w-md text-blue-700">{desc ? desc : ''}</p>
    </div>
  )
}

const RoomCard: FunctionComponent<RoomCardProps> = ({
  img,
  title,
  desc,
  price,
  size,
  loading,
  type = 'room',
}) => {
  const { locale } = useRouter()

  function RoomTypeOnPress() {}
  function RoomOnPress() {}

  if (loading) {
    return (
      <>
        {/* replace this with skeleton loader */}
        <p>loading..</p>
      </>
    )
  }

  if (type === 'roomType') {
    return (
      <RoomCardHolder img={img} title={title}>
        <div className="flex flex-row justify-between items-start">
          <RoomCardTitleSection title={title} desc={desc} />
          <div>
            <p className="mt-8 text-gray-400">Starting from</p>
            <p className="font-bold text-2xl">
              {price ? localizedPrice(price, locale) : ''}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between my-8">
          <span>
            <p className="font-bold text-2xl">{size ? size : ''}</p>
          </span>
          <Button className="w-max py-2 px-8 text-base font-normal leading-tight">
            Show Availability
          </Button>
        </div>
      </RoomCardHolder>
    )
  } else {
    return <div></div>
  }
}

export default RoomCard
