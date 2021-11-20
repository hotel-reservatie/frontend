import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import Slider from '@mui/material/Slider'

import RoomCard from 'src/components/roomCard'
import { Maybe, RoomFilters, useGetFilteredRoomsQuery } from 'src/schema'

const Rooms = () => {
  const [filters, setFilters] = useState<RoomFilters>()
  const [boundries, setBoundries] = useState({ min: 0, max: 100 })
  const [marks, setMarks] = useState([])
  const { query } = useRouter()
  const { loading, error, data } = useGetFilteredRoomsQuery({
    variables: { roomFilter: { ...filters } },
  })

  useEffect(() => {
    setFilters({
      roomTypeIds: query['roomtype'] as Maybe<string[]> | undefined,
    })
  }, [query])

  useEffect(() => {
    console.log(boundries)
  }, [boundries])

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <Slider min={0} max={boundries.max} step={10} />
      </div>
      {data?.getRooms?.map((room, index) => {
        if (room.currentPrice && boundries.max < room.currentPrice) {
          setBoundries({ ...boundries, max: room.currentPrice })
        } else if (room.currentPrice && boundries.min > room.currentPrice) {
          setBoundries({ ...boundries, min: room.currentPrice })
        }

        return (
          <RoomCard
            key={`roomcard-${index}`}
            type="room"
            img={room.images?.[0]}
            title={room.roomName}
            price={room.currentPrice}
            size={room.roomType.capacity}
            surface={room.surface}
            desc={room.description}
            id={room.roomId}
            loading={loading}
          />
        )
      })}
    </div>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Rooms
