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


export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
  username
  id
  createdAt
  }
  }`

  // Mutación para borrar una revisión
export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
