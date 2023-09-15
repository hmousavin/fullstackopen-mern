import { voteAction } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    
    const dispatch = useDispatch()

    const voteHandler = (id) => {
        dispatch(voteAction(id))
        
        const caption = anecdotes.find(a => a.id === id).content
        dispatch(show(`you voted '${caption}'`))
        setTimeout(() => {dispatch(show(''))}, 5000)
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteHandler(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList