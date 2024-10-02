const typeDefs = `
type User {
username: String!
favoriteGenre: String!
id: ID!
}

type Token {
value: String!
}

type Author {
name: String!
id: ID!
born: Int
bookCount: Int!
}

type Book {
title: String!
published: Int!
author: String!
id: ID!
genres: [String]!
}

type Mutation {

createUser(
username: String!
favoriteGenre: String!
password: String!
) : User


login(
username: String!
password: String!
): Token

addBook(
title: String!
published: Int!
author: String!
genres: [String]!
) : Book

editAuthor(
name: String!
setBornTo: Int!
) : Author

}

type Query {
bookCount: Int!
authorCount: Int!
allBooks(author: String, genre: String) : [Book!]!
allAuthors: [Author!]!
me: User

}

type Subscription {
bookAdded: Book!
}
`


module.exports = typeDefs