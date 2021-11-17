import { FunctionComponent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import localizedPrice from 'src/utils/localePrice'

interface RoomCardProps {
  img: string | undefined | null
  title: string | undefined | null
  desc: string | undefined | null
  price: number | undefined | null
  size: number | undefined | null
  loading: boolean
}

const RoomCard: FunctionComponent<RoomCardProps> = ({
  img,
  title,
  desc,
  price,
  size,
  loading,
}) => {
  const { locale } = useRouter()

  if (loading) {
    return (
      <>
        {/* replace this with skeleton loader */}
        <p>loading..</p>
      </>
    )
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 my-8 items-center rounded-xl shadow bg-white">
      <div className="h-72 relative">
        <Image
          src={img ? img : '/not_found.svg'}
          alt={title ? title : 'Not found'}
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-l-xl"
        />
      </div>

      <div className="col-span-3 flex  flex-col px-8 h-full content-between justify-between">
        <div className="flex flex-row justify-between items-start">
          <div className="">
            <h2 className="font-bold text-2xl mt-8 mb-4">
              {title ? title : ''}
            </h2>
            <p className="max-w-md text-blue-700">{desc ? desc : ''}</p>
          </div>
          <div>
            <p className="mt-8 text-gray-400">Starting from</p>
            <p className="font-bold text-2xl">
              {price ? localizedPrice(price, locale) : ''}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between my-8">
          <p className="font-bold text-2xl">{size ? size : ''}</p>
          <button>Show Availability</button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
