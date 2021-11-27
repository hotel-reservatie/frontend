import React, { FunctionComponent } from 'react'
import { MdArrowForward, MdOpenInFull, MdPeople } from 'react-icons/md'
import Card from '../card'
import SubTitle from '../text/SubTitle'

interface SmallRoomCardProps {
  title?: string
  capacity?: number
  surface?: number
  price?: number
  roomId?: string
}

const SmallRoomCard: FunctionComponent<SmallRoomCardProps> = ({
  title,
  capacity,
  surface,
  price,
  roomId,
}) => {
  return (
    <Card className="w-full px-8 py-8 hover:cursor-pointer">
      <div className="grid">
        <SubTitle>
          {title} <MdArrowForward className=" inline-block" />
        </SubTitle>
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

        <div className=" font-bold text-blue-300">
          <span className="text-3xl text-blue-800">{`€${price} `}</span>
          per night
        </div>
      </div>
    </Card>
  )
}

export default SmallRoomCard
