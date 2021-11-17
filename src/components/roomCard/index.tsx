import { FunctionComponent, useEffect, useRef } from 'react'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
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

const People = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 0 22 22"
      fill="#0839BC"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" />
    </svg>
  )
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

  function RoomTypeOnClick(title: string | undefined | null) {
    router.push({ pathname: '/rooms', query: { roomtype: title ? title : '' } })
  }
  function RoomOnClick(title: string | undefined | null) {}

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
          <span className="flex flex-row align-baseline">
            <People />
            <p className="font-bold text-2xl text-blue-700 ml-3">
              {size ? size : ''}
            </p>
          </span>
          <Button
            className="w-max py-2 px-8 text-base font-normal leading-tight"
            onClick={() => RoomTypeOnClick(title)}
          >
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