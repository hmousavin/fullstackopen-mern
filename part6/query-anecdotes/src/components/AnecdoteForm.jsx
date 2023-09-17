import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../services/requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: (error) => {
      dispatch({type: 'SHOW', payload: error.toString()})
      setTimeout(() => {
        dispatch({type:'HIDE'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: (Math.random() * 1000000).toFixed(), votes: 0})
    dispatch({type: 'SHOW', payload: `anecdote '${content}' created`})
    setTimeout(() => {
      dispatch({type:'HIDE'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm