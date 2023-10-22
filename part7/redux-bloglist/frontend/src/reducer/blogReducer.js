import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showError, showInfo } from './notificationReducer'

const fetchAllBlogs = () => {
  return blogService.getAll().then(res => res.data)
}

const blogReducer = createSlice({
  name: 'blog',
  initialState: fetchAllBlogs(),
  reducers: {
    setAllBlogs(state, action) {
      state.blogs = action.payload
      // return action.payload
    },
    addBlogAction(state, action) {
      const { title, author, url } = action.payload
      state.blogs.concat({ title: title, author: author, url: url })
    }
  }
})



export const getAllBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await fetchAllBlogs()
    dispatch(setAllBlogs(allBlogs))
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const response = await blogService.createBlog({ title: title, author: author, url: url })
      if (response) {
        dispatch(addBlogAction({ title: title, author: author, url: url }))
        getAllBlogs()
        dispatch(showInfo(`new blog ${title} just successfully added!`, 5))
      }
      else
        dispatch(showError('wrong credentials', 3))
    } catch (error) {
      dispatch(showError('unable to create new blog', 3))
    }
  }
}

export const { addBlogAction, setAllBlogs } = blogReducer.actions
export default blogReducer.reducer