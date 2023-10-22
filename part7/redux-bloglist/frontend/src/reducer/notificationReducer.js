import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showAction(state, action) {
      const { payload } = action
      return ({ caption: payload.caption, type: payload.type })
    }
  }
})


export const showInfo = (caption, durationInSecond = 3) => (dispatch) => {
  dispatch(showAction({ caption: caption, type: 'info' }))
  setTimeout(() => {
    showAction('')
  }, durationInSecond * 1000)
}

export const showError = (caption, durationInSecond = 5) => (dispatch) => {
  dispatch(showAction({ caption: caption, type: 'error' }))
  setTimeout(() => {
    dispatch(showAction(''))
  }, durationInSecond * 1000)
}

export const { showAction } = notificationSlice.actions
export default notificationSlice.reducer