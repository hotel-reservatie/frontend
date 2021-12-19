import React, { FunctionComponent } from 'react'
import { MdArrowForward } from 'react-icons/md'
import Link from '../translatedLink'
import Translater from '../translater'


const NotSignedIn: FunctionComponent = ({children}) => {
    return (
        <Link href={'/login'}>
        <a className=' text-blue-700 flex items-center gap-1 font-semibold hover:text-blue-500 text-lg'>
          <Translater>{children}</Translater>
          <MdArrowForward  size={24}/>
        </a>
      </Link>
    )
}

export default NotSignedIn
