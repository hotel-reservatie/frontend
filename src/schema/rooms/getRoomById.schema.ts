import { gql } from '@apollo/client'

const GetRoomById = gql`
query getRoomById($roomId: String!){
    getRoomById(id: $roomId){
      roomId
      roomName
      facilities
      description
      images
      surface
      currentPrice
      roomType{
        typeName
        description
      }
      tags{
        name
      }
      reviews{
        reviewId
        title
        description
        reviewScore
        createdAt
        user{
          userId
          userName
        }
      }
    }
  }
`

export default GetRoomById