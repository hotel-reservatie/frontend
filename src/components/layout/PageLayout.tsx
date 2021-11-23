import React, { FunctionComponent } from 'react'

const PageLayout: FunctionComponent = ({ children }) => {
  return <div className=" max-w-7xl mx-auto py-12">{children}</div>
}

export default PageLayout
