import { forwardRef } from 'react'

const LinkWrapper = forwardRef((props: any, ref) => (
  <a ref={ref} {...props}>
    {props.children}
  </a>
))

LinkWrapper.displayName = 'LinkWrapper'

export default LinkWrapper
