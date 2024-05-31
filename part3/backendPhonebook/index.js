require('dotenv').config();
const express = require('express')
const cors = require('cors')
const Contact = require('./models/contact')




const app = express()


app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
// importo morgan - configuro en formato 'tiny' 
const morgan = require('morgan')
app.use(morgan('tiny'))





app.get('/info', (request, response) => {
    const now = new Date();
    response.send(`<div>
    <h1>Phonebook has info for ${persons.length} people</h1>
    <br/>
    ${now}
    </div>`)
})

//GET ALL - MONGO
app.get('/api/persons', (request, response) => {
   Contact.find({}).then(contacts => {
    response.json(contacts)
   })
})

//GET ONE - MONGO
app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  })
})

// Delete
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)

    response.status(204).end()
})



// POST - MONGO
app.post('/api/persons', (request, response) => {
    const body = request.body
    // const normalize = (text) => text.toUpperCase().trim().replace(/\s+/g, '');
    console.log('en body ahi: ', body, 'en body.content: ', body.content)
    if (!body.name || !body.number ) {
        return response.status(400).json({
            error: 'content missing (name and number required)'
        })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number,
        gmail: body.gmail,
        birthday: body.birthday,
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
});

// MIDLEWARE
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


  const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)



















// ¿QUE ES MORGAN?
// registra información sobre las solicitudes que llegan a el servidor(metodo HTTP, url, estado de respuesta, tiempo de respuesta)

// ¿QUE HACE MORGAN?
// intercepta cada solicitud HTTP (POST, PUT, DELETE, ETC) y registra datos sobre la solcitud, en este ejecicio estoy usando el formato 'tiny' de morgan, los datos que se registran los imprime en consola