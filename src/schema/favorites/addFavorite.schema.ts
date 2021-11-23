import { gql } from '@apollo/client'

const AddFavorite = gql`
mutation addFavorite($roomId: String!){
    addFavorite(roomId: $roomId){
        room{
            roomId
        }
    }
  }
`

export default AddFavorite