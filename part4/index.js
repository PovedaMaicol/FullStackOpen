// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')



// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())



// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)