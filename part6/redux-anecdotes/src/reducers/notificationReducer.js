import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showAction(state, action) {
            return action.payload
        }
    }
})

export const show = (caption, duration) => {
    return async dispatch => {
        dispatch(showAction(caption))
        setTimeout(() => {dispatch(show(''))}, duration * 1000)
    }
}

export const {showAction} = notificationSlice.actions;
export default notificationSlice.reducer;