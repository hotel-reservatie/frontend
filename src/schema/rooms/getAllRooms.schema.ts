import { gql } from '@apollo/client'

const GetAllRooms = gql`
  query getAllRooms {
    getAllRooms {
      roomId
      roomName
      description
      surface
      tags {
        name
      }
      currentPrice
      weekendMultiplier
      images
    }
  }
`

export default GetAllRooms
