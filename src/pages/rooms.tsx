import { useEffect, useMemo, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useFilterValues } from 'src/providers/filterProvider'
import { useMutation } from '@apollo/client'
import { useAuth } from 'src/providers/authProvider'
import FormItem, { FormItemOption } from 'src/classes/FormItem'

import debounce from 'lodash.debounce'
import {
  RoomFilters,
  useGetAllFilterValuesQuery,
  useGetFilteredRoomsLazyQuery,
  useGetUserFavoritesLazyQuery,
} from 'src/schema'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'
import dynamic from 'next/dynamic'

const RangeSlider = dynamic(() => import('src/components/rangeSlider'))
const RoomCard = dynamic(() => import('src/components/roomCard'))
const PageTitle = dynamic(() => import('src/components/text/PageTitle'))
const Form = dynamic(() => import('src/components/form'))
const Skeleton = dynamic(() => import('src/components/roomCard/Skeleton'))
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))

const Rooms = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { filters: filterValues, updateFilterValue } = useFilterValues()

  const [filters, setFilters] = useState<RoomFilters>(filterValues)
  const [filterOptions, setFilterOptions] = useState<{
    roomTypes: FormItemOption[]
    roomCapacity: FormItemOption[]
    tags: FormItemOption[]
  }>()

  const [boundries, setBoundries] = useState<{
    min: number | null
    max: number | null
  }>({ min: null, max: null })

  const [getFilteredRooms, { loading, data }] = useGetFilteredRoomsLazyQuery({
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

  const sliderChange = (event: Event, value: number | Array<number>) => {
    if (value instanceof Array) {
      updateFilterValue('maxPrice', value[1])
      updateFilterValue('minPrice', value[0])
    }
  }

  const debouncedSliderChange = useMemo(() => debounce(sliderChange, 300), [])

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
    if (query['roomtype']) {
      updateFilterValue('roomTypeIds', query['roomtype'] as string[])
    } else if (query['daterange']) {
      const dateRange: { arrival: string; departure: string } = JSON.parse(
        query['daterange'] as string,
      )
      setFilters({
        startDate: new Date(dateRange.arrival),
        endDate: new Date(dateRange.departure),
      })
    }
  }, [query])

  useEffect(() => {
    if (user) {
      getUserFavs()
    }
  }, [user])

  useEffect(() => {
    if (filters) {
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
      }
      if (filterData?.getFilters.tags) {
        filterData.getFilters.tags.forEach((t, i) => {
          tags.push({ id: t.tagId ?? String(i), name: t.name })
        })
      }
      setFilterOptions({ roomTypes, roomCapacity, tags })
    }
  }, [filterOptionsLoading])

  const formItems = [
    new FormItem({
      placeholder: 'Arrival Date',
      type: 'date',
      name: 'arrivalDate',
      id: 'startDate',
      className: 'col-span-6 md:col-span-3',
      value: filterValues.startDate,
    }),
    new FormItem({
      placeholder: 'Departure Date',
      type: 'date',
      name: 'departureDate',
      id: 'endDate',
      className: 'col-span-6 md:col-span-3',
      value: filterValues.endDate,
    }),
    new FormItem({
      placeholder: 'Search room name',
      type: 'text',
      id: 'roomName',
      className: 'col-span-6 md:col-span-3',
      name: 'roomName',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Room Type',
      options: filterOptions?.roomTypes,
      name: 'roomType',
      id: 'roomTypeIds',
      className: 'col-span-2 md:col-span-1',
    }),
    new FormItem({
      type: 'dropdown',
      placeholder: 'Room Capacity',
      options: filterOptions?.roomCapacity,
      name: 'roomCapacity',
      id: 'maxCapacity',
      className: 'col-span-2 md:col-span-1',
    }),
    new FormItem({
      type: 'dropdown-multi-select',
      placeholder: 'Tags',
      options: filterOptions?.tags,
      name: 'tags',
      id: 'tagIds',
      className: 'col-span-2 md:col-span-1',
    }),
  ]

  function onItemChange(e: FormItem) {
    updateFilterValue(e.id, e.value)
  }

  useEffect(() => {
    setFilters(filterValues)
  }, [filterValues])

  const debouncedItemChange = useMemo(() => debounce(onItemChange, 300), [])

  return (
    <PageLayout>
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

        <RangeSlider
          boundries={boundries}
          onValueChange={debouncedSliderChange}
        />
      </div>
      {data && data.getRooms && data.getRooms?.length < 1 && (
        <div className="flex justify-center">
          <h1 className="font-semibold text-2xl">
            No rooms currently available
          </h1>
        </div>
      )}
      {loading && <Skeleton amount={3} />}
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
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Rooms
