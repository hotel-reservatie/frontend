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
        }
    }
`