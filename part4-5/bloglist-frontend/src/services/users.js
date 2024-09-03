import axios from "axios";
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }
  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    console.log('ID ES', id)
    return request.then(response => response.data)
  }

export default {getAll, getOne, setToken}