import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [newBlogVisibility, setNewBlogVisibility] = useState(false)

  const localStorageKey = 'loggedInBlogAppUser';

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(localStorageKey)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)

      blogService.setToken(user.token)

      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        localStorageKey, JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername(user.username)
      setPassword(user.password)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    setUsername('')
    setPassword('')

    window.localStorage.removeItem(localStorageKey)
  }

  const createBlog = async (blog) => {
    try {
      await blogService.createBlog(blog)

      setSuccessMessage(`new blog ${blog.title} just successfully added!`)
      getAllBlogs()

      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('unable to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      {user === null ?
        <div>
          <h3>log in to application</h3>
          <Login 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />

        </div> : 
        <div>
          <h2>blogs</h2>
          <p>
              {user.name} logged in <button onClick={handleLogout} type="submit">logout</button>
          </p>
          <NewBlog
            newBlogVisibility = {newBlogVisibility}
            createBlog={createBlog}
          />
          <Togglable
            newBlogVisibility = {newBlogVisibility}
            setNewBlogVisibility = {setNewBlogVisibility}
          />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
      
    </div>
  )
}

export default App