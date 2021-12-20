import React, { FunctionComponent } from 'react'
import { MdArrowForward, MdArrowRight } from 'react-icons/md'
import Link from '../translatedLink'
import Translater from '../translater'

interface EmptyPlaceholderProps {
  href: string
}

const EmptyPlaceholder: FunctionComponent<EmptyPlaceholderProps> = ({
  children,
  href,
}) => {
  return (
    <div>
      <p className=" text-blue-400 mb-4">It looks empty in here... </p>
      <Link href={href}>
        <a className=' text-blue-700 flex items-center gap-1 font-semibold hover:text-blue-500 text-lg'>
          <Translater>{children}</Translater>
          <MdArrowForward  size={24}/>
        </a>
      </Link>
    </div>
  )
}

export default EmptyPlaceholder
