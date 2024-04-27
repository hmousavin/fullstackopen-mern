import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState({message: '', type: 'unknown'})
  const client = useApolloClient()

  useEffect(() => {
    const userFromStorage = localStorage.getItem('library-user-token');
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);
  
  if (!token) {
    return (
      <div>
        <Notification message={notification.message} type={'failure'} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={setNotification}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notification message={notification.message} type={'failure'} />
      
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>

        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommended'} />
    </div>
  )
}

export default App