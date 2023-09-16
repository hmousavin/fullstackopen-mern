import React, { useEffect } from "react";
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import anecdotes from "./services/anecdotes";
import { overrideAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotes.getAll().then(all => {
      dispatch(overrideAnecdotes(all))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App