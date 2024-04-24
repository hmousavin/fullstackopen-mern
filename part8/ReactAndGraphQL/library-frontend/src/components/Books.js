import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Notification from './Notification'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  } 
`
const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [notification, setNotification] = useState({message: '', type: 'unknown'})

  useEffect(() => {
    if (result.error) 
      setNotification({message: result.error.message, type: 'failure'})
  }, [result.error])
  
  if (!props.show)
    return null

  return (
    <div>
      <h2>books</h2>
      <Notification 
        key={new Date().valueOf()} // this id makes a new component, each time !
        message={notification.message} type={notification.type}/>
      {result.loading ? <div>loading...</div> : 
      result.error ? <div></div> :
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  )
}

export default Books