import { gql } from '@apollo/client'

const GetFilteredRooms = gql`
  query getFilteredRooms($roomFilter: RoomFilters) {
    getRooms(Filters: $roomFilter) {
      roomId
      roomName
      images
      description
      surface
      currentPrice
      roomType {
        capacity
      }
    }
  }
`

export default GetFilteredRooms
