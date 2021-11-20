import { gql } from '@apollo/client'

const GetAllRoomTypes = gql`
  query getAllRoomTypes {
    getRoomTypes {
      roomTypeId
      typeName
      description
      capacity
      sampleImage
    }
  }
`

export default GetAllRoomTypes
