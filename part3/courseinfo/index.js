require('dotenv').config();
const express = require('express') // importamos express
const cors = require('cors')
const Note = require('./models/note')
const app = express()


// middlewares

app.use(cors())
app.use(express.static('dist'))
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

  // GET ONE - MONGO con el metodo findById
  app.get('/api/notes/:id', (request, response, next) => {
Note.findById(request.params.id)
.then(note => {
  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
.catch(error => next(error))
  })

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
  
  // UPDATE - MONGO metodo findByIdAndUpdate
  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body 

    const note = {
      content: body.content,
      important: body.important
    }

    Note.findByIdAndUpdate(request.params
      .id, note, { new: true }
    )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
  })

  
  // DELETE - MONGO con el metodo findByIdAndDelete
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })






// Middleware para manejar rutas desconocida
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint)

// Middleware para manejo de errores
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
