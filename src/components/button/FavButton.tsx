import React from 'react'
import { MdFavorite } from 'react-icons/md'

const FavButton = ({ size, isFavorite, onPress, className }: { size: number, isFavorite?: boolean,  onPress: Function, className?: string }) => {
  const handleFavClick = (e: any) => {
    if (onPress) {
      onPress(e)
    }
  }

  return (
    <button className={className ? className : ''} onClick={handleFavClick}>
      <MdFavorite
        className={`${
          isFavorite ? 'text-red-500' : 'text-blue-300'
        } hover:scale-110 hover:cursor-pointer`}
        size={size}
      />
    </button>
  )
}

export default FavButton
