import React, { FunctionComponent, useEffect, useState } from 'react'
import { HiMinusCircle } from 'react-icons/hi'
import { MdDelete, MdOutlinePerson } from 'react-icons/md'
import { useAuth } from 'src/providers/authProvider'
import { User } from 'src/schema'
import formatDate from 'src/utils/formatDate'
import Card from '.'
import Dialog from '../dialog'
import { ReviewStars } from '../reviewStar'
import SubTitle from '../text/SubTitle'

interface ReviewCardProps {
  reviewId: string
  title: string
  score: number
  description?: string
  fromuser: User
  createdAt: string
  onRequestDelete: (reviewId: string) => void
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({
  reviewId,
  title,
  score,
  description,
  fromuser,
  createdAt,
  onRequestDelete
}) => {
  const { user } = useAuth()

  const [show, setShow] = useState(false)

  const handleDelete = () => {
      onRequestDelete(reviewId)
      setShow(false);
  }
  return (
    <Card
      className=" w-full sm:p-8 p-8 flex flex-col justify-between"
      key={reviewId}
    >
      <div>
        <div className="flex justify-between">
          <SubTitle className=" text-xl mb-0">{title}</SubTitle>
          <ReviewStars score={score} />
        </div>
        <p>{description}</p>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-x-2">
          <div>
            <MdOutlinePerson size={24} className=" text-blue-300" />
          </div>
          <p className=" text-base text-blue-300">{fromuser.userName}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-base text-blue-300">{createdAt}</p>
          {user?.uid == fromuser.userId ? (
            <HiMinusCircle
              onClick={() => {
                  setShow(true)
              }}
              size={24}
              className=" text-blue-300 hover:text-red-500 hover:scale-105 hover:cursor-pointer transition-transform"
            />
          ) : null}
        </div>
      </div>
      <Dialog
        title="Warning!"
        show={show}
        onRequestConfirm={() => {
          handleDelete()
        }}
        onRequestClose={() => {
          setShow(false)
        }}
        description="This action will delete your reservation permanently. Continue?"
      />
    </Card>
  )
}

export default ReviewCard
