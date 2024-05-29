const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://backendp:${password}@cluster0.qgjpa3f.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)


// se define el esquema (es una estructura)
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// se define el modelo , es una funcion constructora
const Note = mongoose.model('Note', noteSchema)

// se crea un objeto con ayuda del modelo Note
const note = new Note({
  content: 'HTML',
  important: true,
})
// se guarda la nota en la base de datos, metodo save
// note.save().then(result => {
//   console.log('note saved!', 'en result', result)
//   mongoose.connection.close()
// })


Note.find({ important: true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })