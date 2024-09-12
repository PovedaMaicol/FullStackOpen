import axios from 'axios'
// const baseUrl = '/api/blogs'
const base = import.meta.env.VITE_BACKEND_URL
const url = '/api/blogs'
let token = null


const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(`${base}${url}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${base}${url}`, newObject, config)
  return response.data
}

const update = async (id, updateBlog) => {
  const dire = `${base}${url}/${id}`;
  console.log(dire);
  console.log('updateBlog:', updateBlog);

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(dire, updateBlog, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog: ${error}`);
    throw error;
  }
};



const destroy = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${base}${url}/${id}`, config)
  return response.data
  }

const addComment = async (id, comment) => {
const config = {
  headers: { Authorization: token },
};

  const response = await axios.post(`${base}${url}/${id}/comments`, { comment }, config)
 
  return response.data;
}
export default { getAll, create, update, destroy, addComment, setToken }