import { useMutation } from '@apollo/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect } from 'react'
import PageLayout from 'src/components/layout/PageLayout'
import RoomCard from 'src/components/roomCard'
import PageTitle from 'src/components/text/PageTitle'
import { Authenticated, NotAuthenticated, useAuth } from 'src/providers/authProvider'
import { useGetUserFavoritesLazyQuery } from 'src/schema'
import ToggleFavorite from 'src/schema/favorites/toggleFavorite.schema'

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
    <PageLayout>
      <PageTitle>My Favorites</PageTitle>
      <Authenticated>
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
          <p>Please sign in to view your favorites...</p>
      </NotAuthenticated>
    </PageLayout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  })

export default Favorites