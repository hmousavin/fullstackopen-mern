import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newAnecdote) => {
    if (newAnecdote.content.length > 4)
        axios.post(baseUrl, newAnecdote).then(res => res.data)
    else
        throw Error('too short anecdote, must have length 5 or more')
}

export const updateAnecdote = (updating) => 
    axios.put(`${baseUrl}/${updating.id}`, updating).then(res => res.data)