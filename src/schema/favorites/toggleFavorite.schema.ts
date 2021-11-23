import { gql } from '@apollo/client'

const ToggleFavorite = gql`
mutation toggleFavorite($roomId: String!){
    toggleFavorite(roomId: $roomId)
  }
`

export default ToggleFavorite