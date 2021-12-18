import React, { FunctionComponent } from 'react'
import Translater from '../translater'

const Subtext: FunctionComponent = ({ children }) => {
  return (
    <p className="text-sm text-center text-blue-400 mt-12">
      <Translater>{children}</Translater>
    </p>
  )
}

export default Subtext
