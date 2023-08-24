import { useState, useId } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = (props) => {
  const { blog, updateBlog, removeBlog, userId } = props
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const newId = useId().replaceAll(':','').replace('r','')

  const toggleShowDetails = () => {
    setShowAll(!showAll)

    document.getElementsByClassName('toggle-show')[0].innerText = showAll ? 'view' : 'hide'
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
    <div style={blogStyle} id={'blog'+newId}>
      <div>
        {blog.title}
        &nbsp;<button className='toggle-show' id={showAll ? 'hide-contents-btn'+newId : 'show-contents-btn'+newId} onClick={toggleShowDetails}>view</button>
      </div>
      { showAll &&
        <div>
          <div>      {blog.url}</div>
          <div>
            <span id={'number-of-likes'+newId}>likes {blog.likes}
            </span>
            &nbsp;
            <button id={'like-blog-btn'+newId} onClick={increaseLikes}>like</button>
          </div>
          <div>{blog.author}</div>
          {blog.user!==undefined && blog.user.id === userId &&
           <button id={'remove-blog-btn'+newId} onClick={removeThisBlog}>remove</button>}
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog