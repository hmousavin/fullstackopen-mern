const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  let blog = new Blog(request.body)
  if (blog.likes == undefined)
    blog['likes'] = 0
  else if (blog['title'] == undefined || blog['url'] == undefined)
    return response.status(400).end()

  const user = await User.findOne({})
  
  const savedBlog = await blog.save()
  if (user) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: false })
  
  response.status(200).end()
})

module.exports = blogsRouter