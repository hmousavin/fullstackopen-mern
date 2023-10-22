import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { showError } from './reducer/notificationReducer'
// import { getAllBlogs } from './reducer/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector((state) => state.blogs) || []
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newBlogVisibility, setNewBlogVisibility] = useState(false)

  const localStorageKey = 'loggedInBlogAppUser'

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(localStorageKey)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)

      blogService.setToken(user.token)

      // dispatch(getAllBlogs())
    }
  }, [])

  // const getAllBlogs = async () => {
  //   const allBlogs = await blogService.getAll()
  //   setBlogs(allBlogs)
  // }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(localStorageKey, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername(user.username)
      setPassword(user.password)
    } catch (error) {
      dispatch(showError('Wrong credentials', 3 ))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    setUsername('')
    setPassword('')

    window.localStorage.removeItem(localStorageKey)
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
        // await blogService.removeBlog(blog)
        // setBlogs(blogs.filter((b) => b !== blog))
        console.warn('removeBlog not implemented yet!')
      }
    } catch (error) {
      dispatch(showError('unable to remove selected blog', 3))
    }
  }

  const updateBlog = async (blog) => {
    try {
      await blogService.updateBlog(blog)
    } catch (error) {
      dispatch(showError('uable to increase number of likes', 3))
    }
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h3>log in to application</h3>
          <Login
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout} type="submit">
              logout
            </button>
          </p>
          <NewBlog
            newBlogVisibility={newBlogVisibility}
          />
          <Togglable
            newBlogVisibility={newBlogVisibility}
            setNewBlogVisibility={setNewBlogVisibility}
          />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                userId={user.id}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App