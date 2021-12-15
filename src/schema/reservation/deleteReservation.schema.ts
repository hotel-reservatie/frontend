import gql from "graphql-tag";


const DeleteReservation = gql`
mutation deleteReservation($reservationId: String!){
    deleteReservation(reservationId: $reservationId)
}
`