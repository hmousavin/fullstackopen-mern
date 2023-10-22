import React from 'react'
import { createBlog } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'

const NewBlog = ({ newBlogVisibility }) => {
  const dispatch = useDispatch()

  const addNewBlog = (event) => {
    event.preventDefault()

    const [ { value: title }, { value: author }, { value: url } ] = event.target

    dispatch(createBlog(
      title,
      author,
      url,
    ))
  }

  return newBlogVisibility ? (
    <form onSubmit={addNewBlog}>
      <div>
        <div>
          <label>title:</label>
          <input
            type="text"
            name='title'
            placeholder="the title of blog"
          ></input>
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            name='author'
            placeholder="the author of blog"
          ></input>
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            name='url'
            placeholder="the url of blog"
          ></input>
        </div>
        <button id="create-blog">create</button>
      </div>
    </form>
  ) : (
    ''
  )
}

export default NewBlog