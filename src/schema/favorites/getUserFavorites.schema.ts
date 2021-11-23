import { gql } from '@apollo/client'

const getUserFavorites = gql`
    query getUserFavorites {
        getUserFavorites{
            roomId
        }
    }
`

export default getUserFavorites