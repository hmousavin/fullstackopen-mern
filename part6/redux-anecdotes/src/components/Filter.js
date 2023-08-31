import { filterChange } from "../reducers/filterReducer"
import { useSelector, useDispatch } from "react-redux"

const Filter = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const typedInput = event.target.value;
        dispatch({state: anecdotes, action:filterChange(typedInput), type:Object})      
        // dispatch(filterChange(typedInput))
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

export default Filter