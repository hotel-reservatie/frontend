import { useMutation } from '@apollo/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import { useGetUserFavoritesLazyQuery } from 'src/schema'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'

const EmptyPlaceholder = dynamic(
  () => import('src/components/emptyPlaceholder'),
)
const NotSignedIn = dynamic(
  () => import('src/components/emptyPlaceholder/NotSignedIn'),
)
const ProfileNavigation = dynamic(
  () => import('src/components/navigation/profileNavigation'),
)
const RoomCard = dynamic(() => import('src/components/roomCard'))

const Favorites = () => {
  const { user } = useAuth()
  const [getUserFavs, userFavs] = useGetUserFavoritesLazyQuery()
  const [toggleFavorite, toggleFavoriteResult] = useMutation(ToggleFavorite)

  const handleToggleFav = async (roomId: string) => {
    if (roomId) {
      const res = await toggleFavorite({ variables: { roomId: roomId } })

      if (res && userFavs.refetch) {
        userFavs.refetch()
      }
    }
  }
  useEffect(() => {
    if (user) {
      getUserFavs()
    }
  }, [user])
  return (
    <ProfileNavigation title="My Favorites">
      <Authenticated>
        {userFavs.data?.getUserFavorites &&
          userFavs.data.getUserFavorites.length < 1 && (
            // <div className="flex justify-center flex-row">
            //   <h1 className="font-semibold text-2xl">
            //     <Translater>It looks empty in here...</Translater>
            //   </h1>{' '}
            //   <Link href={'/rooms'}>
            //     <h1 className="font-semibold text-2xl ml-1 underline cursor-pointer hover:text-blue-700">
            //       <Translater>{'Add some of your favorites here!'}</Translater>
            //     </h1>
            //   </Link>
            // </div>
            <EmptyPlaceholder href="/rooms">
              Start adding some favorites
            </EmptyPlaceholder>
          )}
        {userFavs.data?.getUserFavorites.map((room, index) => {
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
              loading={false}
              isFavorite={true}
              onFavToggle={handleToggleFav}
            />
          )
        })}
      </Authenticated>
      <NotAuthenticated>
        <NotSignedIn>Please sign in to view your favorites...</NotSignedIn>
      </NotAuthenticated>
    </ProfileNavigation>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Favorites
