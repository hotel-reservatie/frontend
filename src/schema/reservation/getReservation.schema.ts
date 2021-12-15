import gql from "graphql-tag";


const GetReservation = gql`
    query getReservation($reservationId: String!){
        getReservation(data: $reservationId){
            reservationId
            startDate
            endDate
            totalPrice
            totalAmountOfDays
            weekendDays
            roomsReserved{
                price
                room{
                  roomId
                  roomName
                  roomType{
                    capacity
                  }
                  surface
                  currentPrice
                  weekendMultiplier
                }
            }
        }
    }
`