import { FunctionComponent, useEffect, useState } from 'react'

interface SkeletonProps {
  amount: number
}

const SkeletonBody: FunctionComponent = () => (
  <div className="animate-pulse max-w-7xl mx-auto grid grid-cols-4 my-8 items-center rounded-xl shadow bg-white">
    <div className="h-80 relative bg-gray-300 rounded-l-xl"></div>
    <div className="col-span-3 flex flex-col px-8 h-full content-between justify-between">
      <div className="flex flex-row justify-between items-start">
        <div className="">
          <div className="bg-gray-300 rounded-full mt-8 mb-4 w-48 h-10" />
          <div className="bg-gray-300 rounded-full max-w-md w-72 h-6 my-2" />
          <div className="bg-gray-300 rounded-full max-w-md w-72 h-6 my-2" />
        </div>
        <div>
          <div className="bg-gray-300 rounded-full h-6 w-24 mt-8" />
          <div className="bg-gray-300 rounded-full h-6 w-8 mt-2" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center my-8">
        <div className="bg-gray-300 rounded-full h-6 w-24"></div>
        <div className="bg-gray-300 rounded-full h-14 w-52"></div>
      </div>
    </div>
  </div>
)

export const Skeleton: FunctionComponent<SkeletonProps> = ({ amount }) => {
  const [loaders, setLoaders] = useState<Array<JSX.Element>>([])

  useEffect(() => {
    const tempLoaders = []
    for (let i = 0; i < amount; i++) {
      console.log('pushing')

      tempLoaders.push(<SkeletonBody key={`skeleton-${i}`} />)
    }
    setLoaders(tempLoaders)
  }, [])

  return <>{loaders.length > 0 && loaders.map(item => item)}</>
}
export default Skeleton
