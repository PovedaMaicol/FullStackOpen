const mongoose = require('mongoose')

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
      type: String,
    },
    genres: [
      {type: String}
    ]
  })

  module.exports = mongoose.model('Book', bookSchema)