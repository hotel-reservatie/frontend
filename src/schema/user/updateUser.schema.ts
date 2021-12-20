import { gql } from "@apollo/client";


const UpdateUser = gql`
    mutation updateUser($user: UserInput!){
        saveUser(data: $user)
    }
`