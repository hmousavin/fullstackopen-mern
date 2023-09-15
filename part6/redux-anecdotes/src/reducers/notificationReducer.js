import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        show(state, action) {
            return action.payload
        }
    }
})

export const {show} = notificationSlice.actions;
export default notificationSlice.reducer;