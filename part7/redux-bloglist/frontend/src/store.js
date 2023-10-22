import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer
  }
})

export default store