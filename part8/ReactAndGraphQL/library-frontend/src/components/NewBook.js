import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Notification from './Notification'

const ADD_BOOK = gql`
  mutation($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
const NewBook = (props) => {
  const [addBook] = useMutation(ADD_BOOK)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [notification, setNotification] = useState({message: '', type: 'unknown'})

  if (!props.show)
    return null

  const submit = (event) => {
    event.preventDefault()

    addBook({
      variables: {title, author:{name: author}, published, genres}
    }).then(() => {
      setNotification({message: 'book created!', type: 'success'})

      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }).catch(
      e => setNotification({message: e.message, type: 'failure'})
    )
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type}/>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook