const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    published: {
      type: Number
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    genres: [
      {type: String}
    ]
  })

  module.exports = mongoose.model('Book', bookSchema)