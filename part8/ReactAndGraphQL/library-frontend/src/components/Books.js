import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Notification from './Notification'
import { ALL_BOOKS_BY_GENRE } from '../queries'
import BookByGenres from './BookByGenres'

const Books = (props) => {
  const [genre, setGenre] = useState()
  const booksByGenreQuery = useQuery(ALL_BOOKS_BY_GENRE, { 
    variables: { genre: genre || '' }
  })
  const [notification, setNotification] = useState({message: '', type: 'unknown'})

  useEffect(() => {
    setGenre(null)
    if (booksByGenreQuery.error) 
      setNotification({message: booksByGenreQuery.error.message, type: 'failure'})
  }, [props, booksByGenreQuery.error])

  useEffect(() => {
    if (genre) {
      booksByGenreQuery.refetch({ genre: genre })
    }
  }, [genre, booksByGenreQuery])
  
  if (!props.show)
    return null
  else if (booksByGenreQuery.loading)
    return <div>loading...</div>

  const {allBooksByGenre} = booksByGenreQuery.data

  return (
    <div>
      <h2>books</h2>
      <Notification 
        key={new Date().valueOf()} // this id makes a new component, each time !
        message={notification.message} type={notification.type}/>
      {booksByGenreQuery.loading ? <div>loading...</div> : 
      booksByGenreQuery.error ? <div></div> :
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksByGenre.map((a) => (
                                <tr key={a.title}>
                                  <td>{a.title}</td>
                                  <td>{a.author.name}</td>
                                  <td>{a.published}</td>
                                </tr>
                              ))
          }
        </tbody>
      </table>}
      <BookByGenres genre={genre} setGenre={setGenre} />
    </div>
  )
}

export default Books