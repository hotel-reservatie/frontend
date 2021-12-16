import { gql } from "@apollo/client";


const DeleteReview = gql`
    mutation deleteReview($reviewId: String!){
        deleteReview(reviewId: $reviewId)
    }
`

export default DeleteReview