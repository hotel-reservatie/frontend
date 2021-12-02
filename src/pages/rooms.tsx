import React, { useEffect, useMemo, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'

import RangeSlider from 'src/components/rangeSlider'
import RoomCard from 'src/components/roomCard'
import {
  Maybe,
  RoomFilters,
  useGetAllFilterValuesQuery,
  useGetFilteredRoomsLazyQuery,
  useGetUserFavoritesLazyQuery,
} from 'src/schema'
import { useMutation } from '@apollo/client'
import { useAuth } from 'src/providers/authProvider'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'
import PageTitle from 'src/components/text/PageTitle'
import { useTranslation } from 'react-i18next'
import Form from 'src/components/form'
import FormItem, { FormItemOption } from 'src/classes/FormItem'

const Rooms = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { t } = useTranslation('common')

  const [filters, setFilters] = useState<RoomFilters>()
  const [filterOptions, setFilterOptions] = useState<{
    roomTypes: FormItemOption[]
    roomCapacity: FormItemOption[]
    tags: FormItemOption[]
  }>()

  const [boundries, setBoundries] = useState<{
    min: number | null
    max: number | null
  }>({ min: null, max: null })

  const [getFilteredRooms, { loading, error, data }] =
    useGetFilteredRoomsLazyQuery({
      variables: { roomFilter: { ...filters } },
    })
  const [getUserFavs, userFavs] = useGetUserFavoritesLazyQuery()
  const [toggleFavorite, toggleFavoriteResult] = useMutation(ToggleFavorite)
  const [submitting, setSubmitting] = useState(false)

  const { loading: filterOptionsLoading, data: filterData } =
    useGetAllFilterValuesQuery()

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

  useEffect(() => {
    if (filters) {
      console.log('refetching')
      console.log(filters)

      getFilteredRooms({
        variables: { roomFilter: { ...filters } },
      })
    }
  }, [filters])

  useEffect(() => {
    if (!filterOptionsLoading) {
      const roomCapacity: Array<FormItemOption> = []
      const roomTypes: Array<FormItemOption> = []
      const tags: Array<FormItemOption> = []
      if (filterData?.getFilters.maxCapacity) {
        for (
          let index = 0;
          index < filterData?.getFilters.maxCapacity;
          index++
        ) {
          roomCapacity.push({ id: String(index + 1), name: String(index + 1) })
        }
      }
      if (filterData?.getFilters.roomTypes) {
        const types = filterData.getFilters.roomTypes
        // TODO: sort alphabeticaly
        types.forEach(rt => {
          roomTypes.push({ id: rt.roomTypeId ?? '', name: rt.typeName })
        })
        console.log(roomTypes)
      }
      if (filterData?.getFilters.tags) {
        filterData.getFilters.tags.forEach((t, i) => {
          tags.push({ id: String(i), name: t.name })
        })
      }
      setFilterOptions({ roomTypes, roomCapacity, tags })
    }
  }, [filterOptionsLoading])

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
      options: filterOptions?.roomTypes,
      name: 'roomType',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Room Capacity',
      options: filterOptions?.roomCapacity,
      name: 'roomCapacity',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Tags',
      options: filterOptions?.tags,
      name: 'tags',
    }),
  ]

  function onItemChange(e: FormItem[]) {
    console.log('onItemChange: ', e)

    const hasValue = (val: string) => {
      console.log(val)

      return val.trim().length > 0
    }
    let newFilters = {}
    Object.assign(
      newFilters,
      hasValue(e[2].value) ? { roomName: e[2].value } : null,
      hasValue(e[0].value) ? { startDate: e[0].value } : null,
      hasValue(e[1].value) ? { endDate: e[1].value } : null,
      e[4].value > 0 ? { maxCapacity: e[4].value } : null,
      hasValue(e[3].value) ? { roomType: e[3].value } : null,
    )
    setFilters(newFilters)
  }

  const debouncedItemChange = useMemo(() => debounce(onItemChange, 300), [])

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <PageTitle>Rooms</PageTitle>

        {filterOptions && (
          <Form
            onItemChange={debouncedItemChange}
            submitting={submitting}
            setSubmitting={setSubmitting}
            formItems={formItems}
            rows={2}
            cols={6}
            rowGap={8}
            className="mb-4"
          />
        )}

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
