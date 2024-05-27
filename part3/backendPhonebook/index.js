const express = require('express')
const app = express()

app.use(express.json())
let persons = [
    {
        "id": 1, 
        "name": "julian",
        "number": "111111",
        "gmail": "",
        "birthday": ""
    },
    {
        "id": 2,
        "name": "Pedro",
        "number": "3144142323",
        "gmail": "",
        "birthday": "",
    }
]


//GET ALL
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//GET ONE
app.get('/api/contacts/:id', (request, response) => {
    
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)