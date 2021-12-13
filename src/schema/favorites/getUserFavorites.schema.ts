import { gql } from '@apollo/client'

const getUserFavorites = gql`
    query getUserFavorites {
        getUserFavorites{
            roomId
            images
            roomName
            currentPrice
            roomType{
                capacity
            }
            surface
            description
        }
    }
`

export default getUserFavorites