import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    voteAction(state, action) {
      const index = state.findIndex(s => s.id === action.payload)
      state[index] = {
                      content: state[index].content, 
                      id:      state[index].id, 
                      votes:   state[index].votes + 1
                    }

      state = [...state.sort((a,b) => b.votes - a.votes)]
    },
    addAnecdoteAction(state, action) {
      state.push({
        content: action.payload,
        id:      getId(),
        votes:   0
      })
    },
    overrideAnecdotes(state, action) {
      const {payload} = action
      return payload.length > 0 ? [...payload] : [...initialState]
    }
  }
})

export const {voteAction, addAnecdoteAction, overrideAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;