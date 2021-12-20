import classNames from 'classnames/bind'
import React, { FunctionComponent } from 'react'

interface PLProps {
  className?: string
}

const PageLayout: FunctionComponent<PLProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        { [`${className}`]: className !== undefined },
        'max-w-7xl mx-auto py-12 px-4',
      )}
    >
      {children}
    </div>
  )
}

export default PageLayout
