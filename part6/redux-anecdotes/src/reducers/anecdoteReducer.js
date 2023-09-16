import { createSlice } from "@reduxjs/toolkit"
import anecdotes from "../services/anecdotes"
import { show } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      const index = state.findIndex(s => s.id === action.payload.id)
      state[index] = {
        content: state[index].content, 
        id:      state[index].id, 
        votes:   state[index].votes + 1
      }

      state = [...state.sort((a,b) => b.votes - a.votes)]
    },
    addAnecdoteAction(state, action) {
        state.push(action.payload)
    },
    overrideAnecdotes(state, action) {
      const {payload} = action
      return payload.length > 0 ? [...payload] : []
    }
  }
})

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotes.createNew(content)
    dispatch(addAnecdoteAction(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdotes.updateOne({...anecdote, votes: anecdote.votes + 1})
    dispatch(voteAction(updated))
    
    dispatch(show(`you voted '${anecdote.content}'`, 5))
  }
}

export const {voteAction, addAnecdoteAction, overrideAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;