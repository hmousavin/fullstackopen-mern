import { useDispatch, useSelector } from "react-redux"
import { overrideAnecdotes } from '../reducers/anecdoteReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    
    const handleChange = (event) => {
      event.preventDefault();
      if (event.target.value !== '') {
        const filterd = anecdotes.filter(s => s.content.includes(event.target.value))
        dispatch(overrideAnecdotes(filterd || []));
      }
      else
        dispatch(overrideAnecdotes([]));
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}

export default Filter;