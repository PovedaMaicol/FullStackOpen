import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
      totalCount
    },
}
`
export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {  
    id
    name
    url
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
    }
  }
`;


export const ME = gql`
query {
  me {
    id
    username
  }
}
`;