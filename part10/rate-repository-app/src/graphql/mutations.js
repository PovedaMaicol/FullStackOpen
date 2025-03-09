import { gql } from "@apollo/client";

export const AUTHENTICATION = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: {username: $username, password: $password }) {
    accessToken
    user {
      createdAt
      id
      reviewCount
      username
    }
    }
  }
`;

// Mutación para crear una revisión
export const ADD_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;