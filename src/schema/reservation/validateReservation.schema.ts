import gql from "graphql-tag";


const ValidateReservation = gql`
    query validateReservation($roomIds: [String!]!, $newReservation: NewReservationInput!){
        validateReservation(roomIds: $roomIds, data: $newReservation){
            isValid
            invalidRooms
            totalPrice
            totalDays
            weekendDays
        }
    }
`

export default ValidateReservation