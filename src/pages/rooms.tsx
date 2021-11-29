import React, { useEffect, useMemo, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import RangeSlider from 'src/components/rangeSlider'
import RoomCard from 'src/components/roomCard'
import {
  Maybe,
  RoomFilters,
  useGetFilteredRoomsQuery,
  useGetUserFavoritesLazyQuery,
  useGetUserFavoritesQuery,
} from 'src/schema'
import { useMutation } from '@apollo/client'
import { useAuth } from 'src/providers/authProvider'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'
import SubTitle from 'src/components/text/SubTitle'
import PageTitle from 'src/components/text/PageTitle'
import DateInput from 'src/components/input/DateInput'
import { useTranslation } from 'react-i18next'
import Input from 'src/components/input'
import Dropdown from 'src/components/dropdown'
import Form from 'src/components/form'
import FormItem from 'src/classes/FormItem'
import Button from 'src/components/button'

const Rooms = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { t } = useTranslation('common')

  const [filters, setFilters] = useState<RoomFilters>()
  const [boundries, setBoundries] = useState<{
    min: number | null
    max: number | null
  }>({ min: null, max: null })
  const [marks, setMarks] = useState([])

  const { loading, error, data } = useGetFilteredRoomsQuery({
    variables: { roomFilter: { ...filters } },
  })
  const [getUserFavs, userFavs] = useGetUserFavoritesLazyQuery()
  const [toggleFavorite, toggleFavoriteResult] = useMutation(ToggleFavorite)
  const [submitting, setSubmitting] = useState(false)

  const isFavorite = (roomId: string | null | undefined) => {
    if (userFavs.data && roomId) {
      for (const fav of userFavs.data.getUserFavorites) {
        if (roomId == fav.roomId) {
          return true
        }
      }
    }
    return false
  }

  const handleToggleFav = async (roomId: string) => {
    if (roomId) {
      const res = await toggleFavorite({ variables: { roomId: roomId } })

      if (res && userFavs.refetch) {
        userFavs.refetch()
      }
    }
  }

  const sliderChange = (event: Event, value: number | number[]) => {
    console.log('non-memoized: ', value)
  }

  const defineBoundries = (price: number | null | undefined) => {
    if (price) {
      if (!boundries.max) {
        setBoundries({ ...boundries, max: price })
      } else if (!boundries.min) {
        setBoundries({ ...boundries, min: price })
      } else if (boundries.max < price) {
        setBoundries({ ...boundries, max: price })
      } else if (boundries.min > price) {
        setBoundries({ ...boundries, min: price })
      }
    }
  }

  useEffect(() => {
    setFilters({
      roomTypeIds: query['roomtype'] as Maybe<string[]> | undefined,
    })
  }, [query])

  useEffect(() => {
    if (user) {
      getUserFavs()
    }
  }, [user])

  const roomTypes = [
    {
      id: 1,
      name: 'test 1 label',
    },
    {
      id: 2,
      name: 'test 2 label',
    },
    {
      id: 3,
      name: 'test 3 label',
    },
  ]
  const roomCapacity = [
    {
      id: 1,
      name: 'test 1 label',
    },
    {
      id: 2,
      name: 'test 2 label',
    },
    {
      id: 3,
      name: 'test 3 label',
    },
  ]
  const tags = [
    {
      id: 1,
      name: 'test 1 label',
    },
    {
      id: 2,
      name: 'test 2 label',
    },
    {
      id: 3,
      name: 'test 3 label',
    },
  ]

  const formItems = [
    new FormItem({
      placeholder: t('datepicker.arrivaldate'),
      type: 'date',
      name: 'arrivalDate',
      id: 'arrivalDate',
      className: 'col-span-3',
    }),
    new FormItem({
      placeholder: t('datepicker.departuredate'),
      type: 'date',
      name: 'departureDate',
      id: 'departureDate',
      className: 'col-span-3',
    }),
    new FormItem({
      placeholder: 'Search room name',
      type: 'text',
      id: 'roomName',
      className: 'col-span-3',
      name: 'roomName',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Room Type',
      options: roomTypes,
      name: 'roomType',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Room Capacity',
      options: roomCapacity,
      name: 'roomCapacity',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Tags',
      options: tags,
      name: 'tags',
    }),
  ]

  function onItemChange(e: FormItem[]) {
    console.log('onItemChange: ', e)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <PageTitle>Rooms</PageTitle>
        {/* <div className="grid grid-cols-2 grid-rows-2">
          <DateInput
            placeholder={t('datepicker.arrivaldate')}
            className="text-center placeholder-blue-500"
            onChange={(d: Date) => {}}
          />
          <DateInput
            placeholder={t('datepicker.departuredate')}
            className="text-center placeholder-blue-500 row-start-1"
            onChange={(d: Date) => {}}
          />
          <Input placeholder="Search room name" />
          <div className="flex "> */}
        <Form
          onItemChange={onItemChange}
          submitting={submitting}
          setSubmitting={setSubmitting}
          formItems={formItems}
          rows={2}
          cols={6}
        />
        {/* </div> */}
        {/* </div> */}
        <RangeSlider boundries={boundries} onValueChange={sliderChange} />
      </div>
      {data?.getRooms?.map((room, index) => {
        defineBoundries(room.currentPrice)
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
            isFavorite={isFavorite(room.roomId)}
            onFavToggle={handleToggleFav}
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
