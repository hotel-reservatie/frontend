import { gql } from '@apollo/client'

const AddReview = gql`
mutation addReview($reviewInput: NewReviewInput!){
    addReview(data: $reviewInput){
        reviewId
        reviewScore
        title
        description
        createdAt
      }
    }
`

export default AddReview