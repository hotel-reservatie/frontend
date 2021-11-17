import { gql } from '@apollo/client'

const GetAllRoomTypes = gql`
  query getAllRoomTypes {
    getRoomTypes {
      typeName
      description
      capacity
      sampleImage
    }
  }
`

export default GetAllRoomTypes
