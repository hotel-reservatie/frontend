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
        <p>loading..</p>
      </>
    )
  }

  return (
    <div className="max-w-5xl mx-auto  flex flex-row justify-between  my-8 items-center rounded-xl shadow">
      <div>
        <Image
          placeholder="blur"
          blurDataURL="https://firebasestorage.googleapis.com/v0/b/advfs-hotelreservations.appspot.com/o/comfort-kamer-1.jpg?alt=media&token=1dc6fe7c-98ec-4ad0-8545-21e8e8c979c6"
          width={16}
          height={9}
          src={img ? img : '/not_found.svg'}
          alt={title ? title : 'Not found'}
        />
      </div>

      <div className="flex flex-col bg-white">
        <div className="flex flex-row justify-between items-start">
          <div className=" pr-16">
            <h2 className="font-bold text-xl my-2">{title ? title : ''}</h2>
            <p className="max-w-md">{desc ? desc : ''}</p>
          </div>
          <div>
            <p className="mt-2 text-gray-400">Starting from</p>
            <p className="font-bold">
              {price ? localizedPrice(price, locale) : ''}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between pt-16">
          <p>{size ? size : ''}</p>
          <button>Show Availability</button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
