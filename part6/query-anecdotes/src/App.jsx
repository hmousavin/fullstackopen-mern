import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const NotificationReducer = (state, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return '';
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })  
  
  const [notification, notificationDispatch] = useReducer(NotificationReducer, '')
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type:'SHOW', payload:`anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type:'HIDE'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    // retry: false
  })
  
  if (result.isLoading)
    return <div>loading data ... </div>
  else if (result.isError)
    return <div>anecdote service is not available due to problem in server</div>
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App