import { useQuery } from '@apollo/client'
import UpdateBirthYear from './UpdateBirthYear'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show)
    return null

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    console.error(result.error)
    return <div>Error!</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born > 0 ? a.born : ''}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateBirthYear data={result.data.allAuthors.map(a => ({id: a.id, name: a.name, born: a.born}) )}/>
    </div>
  )
}

export default Authors
