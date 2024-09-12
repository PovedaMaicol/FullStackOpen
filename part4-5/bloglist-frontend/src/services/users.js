import axios from "axios";
const base = import.meta.env.VITE_BACKEND_URL
const url = '/api/users'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

  const create = async (newUser) => {
    const response = await axios.post(`${base}${url}`, newUser)
    return response.data
  }
  const getAll = () => {
    const request = axios.get(`${base}${url}`)
    return request.then(response => response.data)
  }

  const getOne = (id) => {
    const request = axios.get(`${base}${url}/${id}`)
    console.log('ID ES', id)
    return request.then(response => response.data)
  }

export default {create, getAll, getOne, setToken}