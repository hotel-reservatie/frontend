import gql from "graphql-tag";


const GetUserReservations = gql`
    query getUserReservations{
        getUserReservations{
            reservationId
            startDate
            endDate
            totalPrice
            roomsReserved{
                room{
                    roomName
                }
            }
        }
    }
`