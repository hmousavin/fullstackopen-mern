import { useQuery } from "@apollo/client"
import { ALL_GENRES } from '../queries'

const BookByGenres = (props) => {
    const allGenresQuery = useQuery(ALL_GENRES)
    const {setGenre} = props

    if (!allGenresQuery)
        return null
    else if (allGenresQuery.loading)
        return <div>loading...</div>

    const onChangeGenre = (e) => {
        setGenre(allGenres[e.target.value])
    }

    const {allGenres} = allGenresQuery.data

    return <main>
            {allGenres.map((g,i) => (
                <span key={`span-rb${i}`}>
                    <input id={`rb${i}`} key={`rb${i}`} type='radio' name='genres' value={i} onClick={onChangeGenre}/>
                    <label htmlFor={`rb${i}`}>{g}</label>
                </span>
            ))}
           </main>
}

export default BookByGenres