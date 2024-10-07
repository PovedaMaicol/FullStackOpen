import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
id
title
author
published
genres
}
`


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

export const ALL_GENRES = gql`
query {
allGenres
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
export const ADD_USER = gql`
mutation createUser($username:  String!, $favoriteGenre: String!, $password: String!) {
addUser(
username: $username,
favoriteGenre: $favoriteGenre,
password: $password
) {
username
favoriteGenre
}
}
`
export const BOOK_ADDED = gql`
subscription {
bookAdded {
...BookDetails
}
}
${BOOK_DETAILS}
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