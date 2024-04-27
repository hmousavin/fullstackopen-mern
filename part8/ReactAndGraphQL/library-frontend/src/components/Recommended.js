import { useQuery } from '@apollo/client'
import { MY_FAVORITE_GENRE, ALL_BOOKS_BY_GENRE,  } from '../queries'

const Recommended = (props) => {
    const favoriteGenreQuery = useQuery(MY_FAVORITE_GENRE)
    const booksByGenreQuery = useQuery(ALL_BOOKS_BY_GENRE, { variables: { genre: favoriteGenreQuery.data ? favoriteGenreQuery.data.me.favoriteGenre : null }})

    if (!props.show)
        return null
    else if (!favoriteGenreQuery || !booksByGenreQuery)
        return <main>not authenticated</main>

    const {favoriteGenre} = favoriteGenreQuery.data.me
    const {allBooksByGenre} = booksByGenreQuery.data

    return <main>
                <h2>recommendations</h2>
                <label>books in your favorite genre <strong>{favoriteGenre}</strong></label>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    { allBooksByGenre.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                      )) }
                    </tbody>
                </table>
            </main>
}

export default Recommended