import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int ){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first ) {
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
      pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      }
      totalCount
    },
}
`
export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
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
    ownerAvatarUrl,
      reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }   
      }
        pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    }
  }
`;


export const ME = gql`
query ($includeReviews: Boolean = false, $first: Int, $after: String) {
  me {
    id
    username
    reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
          }
          cursor
        }
        pageInfo {
            endCursor
            hasNextPage
        }
      }
  }
}
`;