import { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, updateBlog, removeBlog, userId }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleShowDetails = () => {
    setShowAll(!showAll)

    document.getElementById('view-contents-btn').innerText = showAll ? 'view' : 'hide'
  }

  const increaseLikes = () => {
    ++blog.likes
    updateBlog(blog)
    setLikes(likes + 1)
  }

  const removeThisBlog = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        &nbsp;<button id="view-contents-btn" onClick={toggleShowDetails}>view</button>
      </div>
      {showAll &&
        <div>
          <div>      {blog.url}</div>
          <div>likes {blog.likes}
            &nbsp;<button onClick={increaseLikes}>like</button>
          </div>
          <div>      {blog.author}</div>
          {blog.user.id === userId &&
           <button onClick={removeThisBlog}>remove</button>}
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog