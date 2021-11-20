import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RoomCard from 'src/components/roomCard'
import { Maybe, RoomFilters, useGetFilteredRoomsQuery } from 'src/schema'

const Rooms = () => {
  const [filters, setFilters] = useState<RoomFilters>()
  const { query } = useRouter()
  const { loading, error, data } = useGetFilteredRoomsQuery({
    variables: { roomFilter: { ...filters } },
  })

  useEffect(() => {
    setFilters({
      roomTypeIds: query['roomtype'] as Maybe<string[]> | undefined,
    })
  }, [query])

  return (
    <>
      {data?.getRooms?.map((room, index) => (
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
      ))}
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Rooms
