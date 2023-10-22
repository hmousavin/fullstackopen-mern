import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  if (response.status === 200)
    return response.data

  return []
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  if (response.status === 200)
    return response.data

  return {}
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  if (response.status === 200)
    return response.data

  return {}
}

const removeBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  if (response.status === 200)
    return response.data

  return {}
}

export default { setToken, getAll, createBlog, updateBlog, removeBlog }