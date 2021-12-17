import { gql } from "@apollo/client";


const GetUser = gql`
    query getUserInfo{
        getUserInfo{
            userId
            firstName
            lastName
            userName
            email
            reservationEmail
            phone
            address
            city
            postal
            reviews{
                reviewId
                reviewScore
                room{
                    roomName
                }
            }
            reservations{
                reservationId
                startDate
                totalPrice
            }
            favorites {
                favoriteId
            }
        }
    }
`