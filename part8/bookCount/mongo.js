mongoose.connect(url)

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlenght: 2
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    {typr: String}
  ]
})

const Book = mongoose.model('Book', bookSchema)

const book = new Book({
  title: 'HTML is easy',
  published: 1999,
  author: 'Maiky',
  genres: ['Desarrollo web']
})

book.save().then(result => {
  console.log('book saved!')
  mongoose.connection.close()
})