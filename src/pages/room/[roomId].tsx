import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import {
  NewReviewInput,
  Room,
  useGetRoomByIdLazyQuery,
  useGetRoomByIdQuery,
  useGetUserFavoritesLazyQuery,
  useGetUserFavoritesQuery,
} from 'src/schema'
import Image from 'next/image'
import Button from 'src/components/button'
import SubTitle from 'src/components/text/SubTitle'
import { MdDone, MdOutlinePerson, MdStar, MdFavorite } from 'react-icons/md'
import Card from 'src/components/card'
import ImageScroller from 'src/components/image/ImageScroller'
import { BsTag } from 'react-icons/bs'
import { useAuth } from 'src/providers/authProvider'
import Input from 'src/components/input'
import { useMutation } from '@apollo/client'
import AddReview from 'src/schema/reviews/addReview.schema'
import formatDate from 'src/utils/formatDate'
import FavButton from 'src/components/button/FavButton'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'
import { NewReviewStars, ReviewStars } from 'src/components/reviewStar'
import { useNewReservation } from 'src/providers/reservationProvider'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Room: NextPage = () => {
  const router = useRouter()
  const { roomId } = router.query
  const { user } = useAuth()

  const [getRoomById, { data, refetch }] = useGetRoomByIdLazyQuery()
  const [getUserFavs, userFavs] = useGetUserFavoritesLazyQuery()
  const [toggleFavorite, toggleFavoriteResult] = useMutation(ToggleFavorite)
  const [createReview, createReviewResult] = useMutation(AddReview)
  const [newReview, setNewReview] = useState<NewReviewInput>({
    reviewScore: 0,
    title: '',
    description: '',
    room: { roomId: roomId as string },
  })

  const { addRoom } = useNewReservation()

  const writeReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (user) {
      await createReview({
        variables: {
          reviewInput: { ...newReview, room: { roomId: roomId as string } },
        },
      }),
        setNewReview({
          ...newReview,
          reviewScore: 0,
          title: '',
          description: '',
        })

      if (refetch) refetch()
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'title' || 'description') {
      setNewReview({ ...newReview, [event.target.id]: event.target.value })
    }
  }

  const handleFavButton = async () => {
    if (roomId) {
      const res = await toggleFavorite({ variables: { roomId: roomId } })

      if (res && userFavs.refetch) {
        userFavs.refetch()
      }
    }
  }

  const handleBookRoom = () => {
    if (roomId) {
      addRoom(roomId as string)
      router.push('/newreservation')
    }
  }
  const isFav = (roomId: string | null | undefined) => {
    if (userFavs.data && roomId) {
      for (const fav of userFavs.data.getUserFavorites) {
        if (roomId == fav.roomId) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    if (roomId) {
      getRoomById({ variables: { roomId: roomId as string } })
    }
  }, [router.query])

  useEffect(() => {
    if (user) {
      getUserFavs()
    }
  }, [user])

  return (
    <PageLayout>
      <div className="flex justify-between align-middle">
        <PageTitle>{data?.getRoomById?.roomName}</PageTitle>
        {user ? (
          <FavButton
            size={32}
            isFavorite={isFav(roomId as string)}
            onClick={handleFavButton}
          />
        ) : null}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 items-start">
        <ImageScroller
          images={
            data?.getRoomById?.images ? data.getRoomById.images : undefined
          }
        />
        <div className="grid  row items-start gap-9">
          <div className="flex gap-2">
            {data?.getRoomById?.tags
              ? data.getRoomById.tags.map(t => {
                  return (
                    <Card className=" px-2 py-2 mx-0 flex gap-2" key={t.name}>
                      <div>
                        <BsTag />
                      </div>
                      <span className=" text-xs">{t.name}</span>
                    </Card>
                  )
                })
              : null}
          </div>
          <h2 className=" text-blue-400 mb">
            <span className=" text-2xl font-bold text-blue-700">{`€${
              data?.getRoomById?.currentPrice
                ? data.getRoomById.currentPrice
                : 0
            }`}</span>{' '}
            per night
          </h2>
          <p>{data?.getRoomById?.description}</p>
          <Button onClick={handleBookRoom}>Book this room</Button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:mt-16 gap-x-16">
        <div>
          <SubTitle>Room Type</SubTitle>
          <p className="mt-4">{data?.getRoomById?.roomType.typeName}</p>
          <p className="mt-4">{data?.getRoomById?.roomType.description}</p>
        </div>
        <div>
          <SubTitle>Facilities</SubTitle>
          <ul className="grid grid-cols-auto auto-rows-fr gap-x-6 gap-y-4 mt-4">
            {data?.getRoomById?.facilities
              ? data.getRoomById.facilities.map(f => {
                  return (
                    <li className="flex gap-2 overflow-x-hidden" key={f}>
                      {' '}
                      <div>
                        <MdDone size={24} className=" text-blue-500" />
                      </div>
                      <p>{f}</p>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
      </div>
      <SubTitle className="md:mt-8">Reviews</SubTitle>
      <div className="grid md:grid-cols-2 md:mb-8 auto-rows-fr gap-6 mt-8">
        {data?.getRoomById?.reviews && data.getRoomById.reviews.length > 0
          ? data?.getRoomById?.reviews?.map(r => {
              return (
                <Card
                  className=" w-full sm:p-8 p-8 flex flex-col justify-between"
                  key={r.createdAt}
                >
                  <div>
                    <div className="flex justify-between">
                      <SubTitle className=" text-xl">{r.title}</SubTitle>
                      <ReviewStars score={r.reviewScore} />
                    </div>
                    <p>{r.description}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex gap-x-2">
                      <div>
                        <MdOutlinePerson size={24} className=" text-blue-300" />
                      </div>
                      <p className=" text-base text-blue-300">
                        {r.user?.userName}
                      </p>
                    </div>
                    <p className=" text-base text-blue-300">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                </Card>
              )
            })
          : null}
      </div>
      <SubTitle>Describe your experience</SubTitle>
      {user ? (
        <div className="md:grid md:grid-cols-2">
          <form onSubmit={writeReview}>
            <h3 className="block mb-1 text-blue-600">In amount of stars</h3>
            <NewReviewStars
              onSetReviewScore={(score: number) => {
                setNewReview({ ...newReview, reviewScore: score })
              }}
              newReviewScore={newReview.reviewScore}
            />
            <Input
              label={'In one sentence'}
              id="title"
              onChange={onInputChange}
              placeholder={'This will be the title'}
              value={newReview.title}
            />
            <Input
              label={'In own words'}
              id="description"
              onChange={onInputChange}
              value={newReview.description!}
            />
            <Button>{'schrijf'}</Button>
          </form>
        </div>
      ) : (
        <p>Please sign in to write a review</p>
      )}
    </PageLayout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Room
