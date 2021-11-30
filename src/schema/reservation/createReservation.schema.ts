import gql from "graphql-tag";


export const CreateReservation = gql`

mutation createReservation($newReservation: NewReservationInput! $roomIds: [String!]!){
    createReservation(data: $newReservation, roomIds: $roomIds){
      reservationId
      user{
        userName
      }
      createdAt
      startDate
      endDate
      totalPrice
      roomsReserved{
        roomReservedId
        price
        room{
          roomName
          currentPrice
          weekendMultiplier
        }
      }
      
    }
  }` 