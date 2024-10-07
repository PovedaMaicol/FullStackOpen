const { GraphQLError, subscribe } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { UserInputError, AuthenticationError } = require('apollo-server')

const JWT_SECRET = process.env.JWT_SECRET
console.log('JWT_SECRET en resolvers.js:', JWT_SECRET)

const resolvers = {
    Query: {
  
   
      authorCount: async () => Author.collection.countDocuments(),
  
      bookCount: async () => Book.collection.countDocuments(),
      
      allGenres: async () => {
        const books = await Book.find({});
        const allGenres = books.flatMap(book => book.genres);
        return [...new Set(allGenres)];
      },
      
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
      // Obtén todos los autores
      allAuthors: async () => {
        const authors = await Author.find({});

        // Usa agregación para contar los libros por autor
        const booksPerAuthor = await Book.aggregate([
          { $group: {_id: "$author", bookCount: { $sum: 1}}}
        ]);
        // Mapea los autores con el conteo de libros
        return authors.map(author => {
          const authorBookInfo = booksPerAuthor.find(b => b._id.toString() === author._id.toString())

      
              return {
                  ...author._doc, 
                  bookCount: authorBookInfo ? authorBookInfo.bookCount : 0,
                  id: author._id.toString()
                 
              }
          })
      },
  
      me: (root, args, context)  => {
        return context.currentUser
  
      }
    },
  
    Mutation: {
      addUser: async (root, args) => {
        const { username, favoriteGenre, password } = args

        if(password.length < 3) {
          throw new UserInputError('Password must be at least 5 characters long')
        }

        const existingUser = await User.findOne({username})
        if (existingUser) {
          throw new UserInputError('Username already exists', {
            invalidArgs: args,

          })
          
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        console.log('User arguments: ', args);
        const user = new User({ 
          username,
          favoriteGenre,
          passwordHash
          })

          try {
            await user.save()
          } catch {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
  
        return user
      
      },
  
      login: async (root, args) => {
        const { username, password } = args

        const user = await User.findOne({ username })
  
        if ( !user ) {
          throw new UserInputError('Incorrect username or password')
        }

        const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

        if(!passwordCorrect) {
          throw new UserInputError('Incorrect username or password')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET)}
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

                        // AQUI VOY
          pubsub.publish('BOOK_ADDED', {bookAdded: savedBook})
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
          throw new GraphQLError('Error en la creación del libro', {
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
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
    
  
  };

  module.exports = resolvers