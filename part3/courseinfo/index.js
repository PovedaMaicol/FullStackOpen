const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


// middlewares
// app.use(cors())
// app.use(express.static('dist'))
// app.use(express.json())





// HOME
//   app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
//   })
  
//   // GET ALL - MONGO
//   app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//       response.json(notes)
//     })
//   })

//   // GET ONE - MONGO con el metodo findById
//   app.get('/api/notes/:id', (request, response, next) => {
// Note.findById(request.params.id)
// .then(note => {
//   if(note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
// })
// .catch(error => next(error))
//   })

//   //POST MONGO
//   app.post('/api/notes', (request, response, next) => {
//   const body = request.body;
           
//   const note = new Note({
//   content: body.content,
//   important: body.important || false,
//   })
      
//   note.save()
//   .then(savedNote => {
//   response.json(savedNote)
//   })
//   .catch(error => next(error))
//   })
  
//   // UPDATE - MONGO metodo findByIdAndUpdate
//   app.put('/api/notes/:id', (request, response, next) => {
//     const { content, important} = request.body

//     Note.findByIdAndUpdate(request.params
//       .id, { content, important}, {new: true, runValidators: true, context: 'query'}
//     )
    
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
//   })

  
//   // DELETE - MONGO con el metodo findByIdAndDelete
//   app.delete('/api/notes/:id', (request, response, next) => {
//     Note.findByIdAndDelete(request.params.id)
//     .then(result => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
//   })






// // Middleware para manejar rutas desconocida
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// }

// app.use(unknownEndpoint)

// // Middleware para manejo de errores
// const errorHandler = (error, request, response, next) => {
//   console.log(error.message)

//   if(error.name === 'CastError') {
//     return response.status(400).send({error: 'malformatted id'})
//   } else if(error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message})
//   }

//   next(error)
// }

// app.use(errorHandler)


// const PORT = process.env.PORT
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
