import { gql } from '@apollo/client'

const GetFilteredRooms = gql`
  query getFilteredRooms($roomFilter: RoomFilters) {
    getRooms(Filters: $roomFilter) {
      roomId
      roomName
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
