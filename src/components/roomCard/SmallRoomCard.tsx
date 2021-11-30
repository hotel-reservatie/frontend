import React, { FunctionComponent } from 'react'
import { MdArrowForward, MdOpenInFull, MdPeople } from 'react-icons/md'
import { HiMinusCircle } from 'react-icons/hi'
import Card from '../card'
import SubTitle from '../text/SubTitle'
import Link from 'next/link'

interface SmallRoomCardProps {
  title?: string
  capacity?: number
  surface?: number
  price: number
  roomId?: string
  isValid?: boolean
  onDelete?: Function
  weekendMultiplier: number
}

const SmallRoomCard: FunctionComponent<SmallRoomCardProps> = ({
  title,
  capacity,
  surface,
  price,
  roomId,
  isValid = false,
  onDelete,
  weekendMultiplier,
}) => {
  const handleDelete = () => {
    if (onDelete) onDelete(roomId)
  }

  return (
    <Card
      className={`w-full px-8 py-8 ${
        !isValid ? ' border-2 border-red-400' : ''
      }`}
    >
      <div className="grid">
        <div className="mb-4">
          <Link href={`/room/${roomId}`}>
            <a className="flex justify-between items-center">
              <SubTitle className=" mb-0  overflow-hidden whitespace-nowrap overflow-clip">
                {title
                  ? title?.length >= 14
                    ? `${title?.substr(0, 14)}...`
                    : title
                  : null}
              </SubTitle>
              <MdArrowForward size={24} className=" inline-block" />
            </a>
          </Link>
          <span className=" text-red-600">{!isValid ? 'Not available for given time' : <br></br>}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdPeople size={32} />
            <span className=" font-semibold text-2xl">{capacity}</span>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <MdOpenInFull size={32} />
            <span className=" font-semibold text-2xl">{surface}</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-blue-300">
              <span className="text-blue-400 font-semibold">{`€${
                Math.round(price * weekendMultiplier * 100) / 100
              } `}</span>
              weekend
            </div>
            <div className=" font-bold text-blue-300">
              <span className="text-3xl text-blue-800">{`€${price} `}</span>
              per night
            </div>
          </div>
          <HiMinusCircle
            onClick={handleDelete}
            size={32}
            className=" text-blue-300 hover:text-red-500 hover:scale-105 hover:cursor-pointer transition-transform"
          />
        </div>
      </div>
    </Card>
  )
}

export default SmallRoomCard
