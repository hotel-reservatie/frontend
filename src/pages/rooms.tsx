import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Maybe, RoomFilters, useGetFilteredRoomsQuery } from 'src/schema'

const Rooms = () => {
  const [filters, setFilters] = useState<RoomFilters>()
  const { query } = useRouter()
  const { loading, error, data, refetch } = useGetFilteredRoomsQuery({
    variables: { roomFilter: { ...filters } },
  })

  useEffect(() => {
    console.log('data: ', data)
    console.log('error: ', error)
    console.log('loading: ', loading)
  }, [data, error, loading])

  useEffect(() => {
    setFilters({
      roomTypeIds: query['roomtype'] as Maybe<string[]> | undefined,
    })
  }, [query])

  return <div></div>
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Rooms
