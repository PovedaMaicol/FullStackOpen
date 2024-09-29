const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('apollo-server')
const {v1: uuid} = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
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
`

const resolvers = {
  Query: {

 
    authorCount: async () => Author.collection.countDocuments(),

    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {

      let query = {};

      if(args.author) {
        const author = await Author.findOne({ name: args.author });
        if(author) {
          query.author = author._id;
        } else {
          console.log(`No se encontró el autor: ${args.author}`);
          return []; 
      }
      }

      if(args.genre) {
        query.genres = { $in: [args.genre] };
      }

      const books = await Book.find(query).populate('author');


     return books.map(book => {


        return {
          ...book._doc,
          id: book._id ? book.id.toString() :  null,
          author: book.author ? book.author.name : "Unknown Author",
          genres: Array.isArray(book.genres) ? book.genres : [book.genres]
        };
      });
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});

        return authors.map(author => {
          if (!author || !author._id)  {
            return { ...author, bookCount: 0 };
          }
          

          const bookCount = books.filter(book => book.author && book.author.equals(author._id)).length;
            return {
                ...author._doc, 
                bookCount,
                id: author._id.toString()
               
            }
        })
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        let author = await Author.findOne({ name: args.author });

        if(!author) {
          author = new Author({ name: args.author });
          await author.save()
        }
        console.log('Book arguments: ', args);


        const book = new Book({
        ...args, 
        author: author._id 
        });

        const savedBook = await book.save();
        return savedBook


        } catch (error) {
          console.error("Error details: ", error);
        if (error.name === 'ValidationError') {
          throw new GraphQLError('Error validation ' + error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            },
          });
        }
        console.error('Error en la creación del libro' + error, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new GraphQLError('not autenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

 

   try {
    author.born = args.setBornTo;
    return await author.save();
   } catch (error){
    console.error('Error en la actualizacion del author' + error.message);
    throw new GraphQLError('Error en la actualizacion del autor',  {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        error: error.message
      },
    });
   }

    
    }
  },

};


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
      .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})