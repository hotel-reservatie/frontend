import React, { FunctionComponent } from 'react'
import { MdFavorite } from 'react-icons/md'

interface FavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite?: boolean
  size: number
}
// { size, isFavorite, onPress, className }: { size: number, isFavorite?: boolean,  onPress: Function, className?: string }
const FavButton: FunctionComponent<FavButtonProps> = ({
  size,
  isFavorite,
  className,
  ...props
}) => {
  return (
    <button className={className ? className : ''} {...props}>
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
