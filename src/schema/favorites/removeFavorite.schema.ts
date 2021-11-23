import { gql } from '@apollo/client'

const DeleteFavorite = gql`
mutation deleteFavorite($roomId: String!){
    deleteFavorite(roomId: $roomId)
}
`

export default DeleteFavorite