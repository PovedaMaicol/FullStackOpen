require('dotenv').config();
const express = require('express') // importamos express
const cors = require('cors')
const Note = require('./models/note')


const app = express()


// middlewares

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())

// HOME
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  // GET ALL - MONGO
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })


  // GET ONE - con el metodo findById
  app.get('/api/notes/:id', (request, response) => {
Note.findById(request.params.id).then(note => {
  response.json(note)
})
  })
  
  // DELETE
  // app.delete('/api/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)
  //   notes = notes.filter(note => note.id !== id)
  
  //   response.status(204).end()
  // })


    //POST MONGO
    app.post('/api/notes', (request, response) => {
      const body = request.body;
    
      if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
      }
    
      const note = new Note({
        content: body.content,
        important: body.important || false,
      })
    
      note.save().then(savedNote => {
        response.json(savedNote)
      })
    })
// Middleware para manejar rutas desconocidas
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
