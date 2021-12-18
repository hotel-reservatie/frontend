import { forwardRef } from 'react'

const LinkWrapper = forwardRef((props: any, ref) => (
  <a ref={ref} {...props}>
    {props.children}
  </a>
))

export default LinkWrapper
