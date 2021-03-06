import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  NewReviewInput,
  useDeleteReviewMutation,
  useGetRoomByIdLazyQuery,
  useGetUserFavoritesLazyQuery,
} from 'src/schema'
import AddReview from 'src/schema/reviews/addReview.schema'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'
import { MdDone } from 'react-icons/md'
import { BsTag } from 'react-icons/bs'
import { useNewReservation } from 'src/providers/reservationProvider'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import { useMutation } from '@apollo/client'
import formatDate from 'src/utils/formatDate'

import { NewReviewStars } from 'src/components/reviewStar'
import dynamic from 'next/dynamic'

const Link = dynamic(() => import('next/link'))
const SubTitle = dynamic(() => import('src/components/text/SubTitle'))
const NotSignedIn = dynamic(
  () => import('src/components/emptyPlaceholder/NotSignedIn'),
)
const PageLayout = dynamic(() => import('src/components/layout/PageLayout'))
const PageTitle = dynamic(() => import('src/components/text/PageTitle'))
const ReviewCard = dynamic(() => import('src/components/card/ReviewCard'))
const FavButton = dynamic(() => import('src/components/button/FavButton'))
const Input = dynamic(() => import('src/components/input'))
const Card = dynamic(() => import('src/components/card'))
const Button = dynamic(() => import('src/components/button'))
const ImageScroller = dynamic(
  () => import('src/components/image/ImageScroller'),
)

const RoomPage: NextPage = () => {
  const router = useRouter()
  const { roomId } = router.query
  const { user } = useAuth()

  const [getRoomById, { data, refetch }] = useGetRoomByIdLazyQuery()
  const [getUserFavs, userFavs] = useGetUserFavoritesLazyQuery()
  const [toggleFavorite, toggleFavoriteResult] = useMutation(ToggleFavorite)
  const [createReview, createReviewResult] = useMutation(AddReview)
  const [deleteReview] = useDeleteReviewMutation()
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
    }
  }

  const handleDeleteReview = (reviewId: string) => {
    deleteReview({ variables: { reviewId: reviewId } }).then(r => {
      if (refetch) refetch()
    })
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
      <div className="flex justify-between items-start mb-8 gap-2">
        <PageTitle className=" mb-0 whitespace-normal">
          {data?.getRoomById?.roomName}
        </PageTitle>
        <Authenticated>
          <FavButton
            size={32}
            isFavorite={isFav(roomId as string)}
            onClick={handleFavButton}
          />
        </Authenticated>
      </div>
      <div className="mb-8 md:mb-0 md:grid md:grid-cols-2 md:gap-x-16 items-start">
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
                    <Card
                      className=" px-2 py-2 mx-0 flex items-center gap-2"
                      key={t.name}
                    >
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
            <span className=" text-2xl font-bold text-blue-700">{`???${
              data?.getRoomById?.currentPrice
                ? data.getRoomById.currentPrice
                : 0
            }`}</span>{' '}
            per night
          </h2>
          <p>{data?.getRoomById?.description}</p>
          <Authenticated>
            <Button onClick={handleBookRoom}>
              <Link href={`/newreservation`}>Book this room</Link>
            </Button>
          </Authenticated>
          <NotAuthenticated>
            <Button disabled={true}>Sign in to book</Button>
          </NotAuthenticated>
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
        {data?.getRoomById?.reviews && data.getRoomById.reviews.length > 0 ? (
          data?.getRoomById?.reviews?.map(r => {
            return (
              <ReviewCard
                key={r.reviewId}
                reviewId={r.reviewId!}
                title={r.title}
                score={r.reviewScore}
                description={r.description!}
                fromuser={r.user!}
                createdAt={formatDate(r.createdAt)}
                onRequestDelete={handleDeleteReview}
              />
            )
          })
        ) : (
          <p>It looks empty here... Be the first to write a review!</p>
        )}
      </div>
      <SubTitle>Describe your experience</SubTitle>
      <Authenticated>
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
            <Button>WRITE</Button>
          </form>
        </div>
      </Authenticated>
      <NotAuthenticated>
        <NotSignedIn>Please sign in to write a review...</NotSignedIn>
      </NotAuthenticated>
    </PageLayout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default RoomPage
