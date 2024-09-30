import { gql } from "@apollo/client";


export const ME = gql`
query {
me {
username
favoriteGenre
}
}`


export const ALL_AUTHORS = gql`
query {
allAuthors {
born
name
id
bookCount
}
}
`

export const ALL_BOOKS = gql`
query {
allBooks {
title
published
author
id
genres
}
}
`
 
export const FIND_BOOKS_RECOMMEND = gql`
query findBooksRecommend($favoriteGenre: String!) {
allBooks(genre: $favoriteGenre) {
title
published
author
id
genres
}
}`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
addBook(
title: $title,
published: $published,
author: $author,
genres: $genres
) {
title
published
author
id
genres
}
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
editAuthor(name: $name, setBornTo: $setBornTo) {
name
born
}
}
`

export const LOGIN = gql`
 mutation login($username: String!, $password: String!) {
login(username: $username, password: $password)  {
value
}
  }
`