import { gql } from '@apollo/client'

const GetAllRoomTypes = gql`
  query getAllRoomTypes {
    getRoomTypes {
      roomTypeId
      typeName
      description
      capacity
      sampleImage
      startingPrice
    }
  }
`

export default GetAllRoomTypes
