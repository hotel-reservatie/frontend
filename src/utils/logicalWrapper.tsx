import { FunctionComponent, useContext, useMemo } from 'react'

export const createLogicalWrapper = (context: any, consumer: any) => {
  const LogicalWrapper: FunctionComponent = ({ children }) => {
    const ctx = useContext(context)
    const condition = useMemo(() => consumer(ctx), [ctx])
    return <>{condition ? children : null}</>
  }
  return LogicalWrapper
}
