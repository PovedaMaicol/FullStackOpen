import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'  //--> prueba  con nostas verdaderas
let token = null
// const baseUrl = '/api/notes'   //-> para render
// const baseUrl ='http://localhost:3001/notes'  -> con serverjs

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
  headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update, setToken 
}