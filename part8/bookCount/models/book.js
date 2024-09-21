const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      minlenght: 3
    },
    published: {
      type: Number
    },
    author: {
      type: String,
      required: true,
      minlenght:3
    },
    genres: [
      {type: String}
    ]
  })

  module.exports = mongoose.model('Book', bookSchema)