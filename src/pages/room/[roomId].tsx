import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from 'src/components/text/PageTitle'
import { Room, useGetRoomByIdQuery } from 'src/schema'
import Image from 'next/image'
import Button from 'src/components/button'
import SubTitle from 'src/components/text/SubTitle'
import { MdDone, MdOutlinePerson, MdStar } from 'react-icons/md'
import Card from 'src/components/card'

const Room: NextPage = () => {
  const router = useRouter()
  const { roomId } = router.query

  const [selectedImage, setSelectedImage] = useState(0)

  const { loading, error, data } = useGetRoomByIdQuery({
    variables: { roomId: roomId as string },
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const formatDate = (date: any) => {
    const d = new Date(date)

    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
  }

  const generateStars = (score: number) => {
    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < score) {
        stars.push(
          <div>
            <MdStar size={24} className=" text-yellow-400" />
          </div>,
        )
      } else {
        stars.push(
          <div>
            <MdStar size={24} className=" text-blue-300" />
          </div>,
        )
      }
    }
    return stars
  }

  const handleImageClick = (e: FormEvent) => {
    const target: HTMLImageElement = e.target as HTMLImageElement

    const id = parseInt(target.id) 

    setSelectedImage(id)
    
  }

  return (
    <PageLayout>
      <PageTitle>{data?.getRoomById?.roomName}</PageTitle>
      <div className="md:grid md:grid-cols-2 md:mt-16 md:gap-x-16 items-start">
        <div className="flex flex-col gap-4">
          <img
            className="rounded-3xl w-full h-auto"
            src={data?.getRoomById?.images ? data.getRoomById.images[selectedImage] : ''}
            alt=""
          />
          <div className="flex justify-center items-center gap-4 min-h-128">
            {data?.getRoomById?.images
              ? data.getRoomById.images.map((image: string, index: number) => {
                  return (
                    <button key={image} onClick={handleImageClick}>
                      <img
                        src={image}
                        alt=""
                        id={index.toString()}
                        className={`${
                          index == selectedImage ? 'w-128 h-128' : 'w-100 h-100 opacity-50 hover:opacity-75'
                        } object-cover object-center rounded-2xl transition-all `}
                      />
                    </button>
                  )
                })
              : null}
          </div>
        </div>
        <div className="grid grid-rows-3 items-center gap-9">
          <h2 className=" text-blue-400 mb">
            <span className=" text-2xl font-bold text-blue-700">{`€${
              data?.getRoomById?.currentPrice
                ? data.getRoomById.currentPrice
                : 0
            }`}</span>{' '}
            per night
          </h2>
          <p>{data?.getRoomById?.description}</p>
          <Button>Book this room</Button>
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
      <div className="grid md:grid-cols-2 auto-rows-fr gap-6 mt-8">
        {data?.getRoomById?.reviews && data.getRoomById.reviews.length > 0 ? (
          data?.getRoomById?.reviews?.map(r => {
            return (
              <Card
                className=" w-full sm:p-8 p-8 flex flex-col justify-between"
                key={r.createdAt}
              >
                <div>
                  <div className="flex justify-between">
                    <SubTitle className=" text-xl">{r.title}</SubTitle>
                    <div className="flex">{generateStars(r.reviewScore)}</div>
                  </div>
                  <p className=" mt-4">{r.description}</p>
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
        ) : (
          <p>nothing here...</p>
        )}
      </div>
    </PageLayout>
  )
}

export default Room
