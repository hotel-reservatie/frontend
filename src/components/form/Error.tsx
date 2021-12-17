import { FunctionComponent } from 'react'

interface ErrorProps {
  message: string
}

const FormError: FunctionComponent<ErrorProps> = ({ message }) => {
  return (
    <div className="border-red-400 border rounded-lg bg-red-100 mb-4 p-2 text-center text-red-600">
      <p>{message}</p>
    </div>
  )
}

export default FormError
