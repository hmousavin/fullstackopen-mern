import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdoteHandler = (event) => {
        event.preventDefault()
        const newContent = event.target.newContent.value
        event.target.newContent.value = ''
        
        dispatch(addAnecdoteAction(newContent))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdoteHandler}>
                <div><input name='newContent'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm