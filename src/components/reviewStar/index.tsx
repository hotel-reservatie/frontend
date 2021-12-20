import React, { FunctionComponent, useState } from 'react'
import { MdStar } from 'react-icons/md'

interface ReviewStarProps extends React.HTMLAttributes<HTMLDivElement> {
  size: number
}

const ReviewStar: FunctionComponent<ReviewStarProps> = ({ size, ...props }) => {
  return (
    <div {...props}>
      <MdStar size={size} />
    </div>
  )
}

export const ReviewStars = ({ score }: { score: number }) => {
  const generateStars = (score: number) => {
    const stars = []

    for (let i = 0; i < 5; i++) {
      stars.push(
        <ReviewStar
          size={24}
          className={`${i < score ? 'text-yellow-400' : 'text-blue-300'}`}
          key={i}
        />,
      )
    }
    return stars
  }
  return <div className="flex">{generateStars(score)}</div>
}

export const NewReviewStars = ({
  onSetReviewScore,
  newReviewScore,
}: {
  onSetReviewScore: Function
  newReviewScore: number
}) => {
  const [hoveredStar, setHoveredStar] = useState(-1)

  const stars = [0, 0, 0, 0, 0]

  return (
    <div className="flex mb-4">
      {stars.map((isOn, index) => {
        return (
          <ReviewStar
            key={`star_${index}`}
            size={48}
            id={index.toString()}
            className={`${
              index <= hoveredStar ? 'text-yellow-400' : 'text-blue-300'
            } hover:cursor-pointer`}
            onMouseEnter={e => {
              setHoveredStar(index)
            }}
            onMouseLeave={() => {
              setHoveredStar(newReviewScore - 1)
            }}
            onClick={() => {
              onSetReviewScore(index + 1)
            }}
          />
        )
      })}
    </div>
  )
}

export default ReviewStar
