import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowDetails = () => {
    setShowAll(!showAll)
  
    document.getElementById("view-contents-btn").innerText = showAll ? 'view' : 'hide'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} 
        <button id="view-contents-btn" onClick={toggleShowDetails}>view</button>
      </div>
      {showAll &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.author}</div>
        </div>
      }
    </div>  
  )
}

export default Blog