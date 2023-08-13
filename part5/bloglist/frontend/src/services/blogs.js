import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const removeBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { setToken, getAll, createBlog, updateBlog, removeBlog }