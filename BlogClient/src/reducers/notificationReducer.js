import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: '', timeoutId: -1 }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification(state, action) {
      if (state.timeoutId !== -1) clearTimeout(state.timeoutId)

      return initialState
    },
    setNotification(state, action) {
      if (state.timeoutId !== -1) clearTimeout(state.timeoutId)

      return action.payload
    },
  },
})

export const { resetNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer
