import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdoteHandler = (event) => {
        event.preventDefault()
        const newContent = event.target.newContent.value
        event.target.newContent.value = ''
        
        dispatch(addAnecdoteAction(newContent))
        dispatch(show(`you created '${newContent}'`))
        setTimeout(() => {dispatch(show(''))}, 5000)
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