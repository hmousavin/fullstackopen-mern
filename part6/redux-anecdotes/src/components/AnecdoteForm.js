import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const newContent = event.target.newContent.value
        event.target.newContent.value = ''
        
        dispatch({type:'ADD_ANECDOTE', content:newContent})
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='newContent'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm