import { gql } from '@apollo/client'

const GetAllRooms = gql`
  query getAllFilterValues {
    getFilters {
      roomTypes {
        typeName
        roomTypeId
      }
      tags {
        name
        tagId
      }
      maxCapacity
    }
  }
`

export default GetAllRooms
