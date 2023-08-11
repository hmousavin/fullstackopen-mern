import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const localStorageKey = 'loggedInBlogAppUser';

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(localStorageKey)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)

      blogService.setToken(user.token)

      const blogs = blogService.getAll()
      setBlogs(blogs)
    }
  }, [])

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem(localStorageKey)
  }

  return (
    <div>
      
      <Notification message={errorMessage}/>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App