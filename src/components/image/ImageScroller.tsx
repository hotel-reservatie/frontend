import React, { FormEvent, useEffect, useState } from 'react'

const ImageScroller = ({ images }: { images?: string[] | undefined }) => {
  const [selectedImage, setSelectedImage] = useState(0)


  
  const handleImageClick = (e: FormEvent) => {
    const target: HTMLImageElement = e.target as HTMLImageElement

    const id = parseInt(target.id) 

    setSelectedImage(id)
    
  }

  useEffect(() => {
      console.log(images);
      
  }, [images])
  return (
    <div className="flex flex-col gap-4">
      <img
        className="rounded-3xl w-full h-auto max-h-80 object-cover object-center"
        src={images ? images[selectedImage] : ''}
        alt=""
      />
      <div className="flex justify-center items-center gap-4 min-h-100">
        {images
          ? images.map((image: string, index: number) => {
              return (
                <button key={image} onClick={handleImageClick}>
                  <img
                    src={image}
                    alt=""
                    id={index.toString()}
                    className={`${
                      index == selectedImage
                        ? 'w-100 h-100'
                        : 'w-20 h-20 opacity-50 hover:opacity-75'
                    } object-cover object-center rounded-2xl transition-all `}
                  />
                </button>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default ImageScroller
