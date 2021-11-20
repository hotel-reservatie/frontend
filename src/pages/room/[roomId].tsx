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
import ImageScroller from 'src/components/image/ImageScroller'
import { BsTag } from 'react-icons/bs'

const Room: NextPage = () => {
  const router = useRouter()
  const { roomId } = router.query

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
          <div key={i}>
            <MdStar size={24} className=" text-yellow-400" />
          </div>,
        )
      } else {
        stars.push(
          <div key={i}>
            <MdStar size={24} className=" text-blue-300" />
          </div>,
        )
      }
    }
    return stars
  }

  return (
    <PageLayout>
      <PageTitle>{data?.getRoomById?.roomName}</PageTitle>
      <div className="md:grid md:grid-cols-2 md:mt-16 md:gap-x-16 items-start">
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
                    <Card className=" px-2 py-2 mx-0 flex gap-2" key={t.name}>
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
