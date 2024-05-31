// importar mongoose
const mongoose = require('mongoose')
// configurar mongoose
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('conecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.messge)
})

// defino el esquema
const contactSchema = new mongoose.Schema({
        name: String,
        number: Number,
        gmail: String,
        birthday: String
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)