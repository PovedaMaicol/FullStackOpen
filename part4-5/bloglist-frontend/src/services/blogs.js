import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


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

const update = async (id, updateBlog) => {
  const dire = `${baseUrl}/${id}`;
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

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
  }

const addComment = async (id, comment) => {
const config = {
  headers: { Authorization: token },
};

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
 
  return response.data;
}
export default { getAll, create, update, destroy, addComment, setToken }