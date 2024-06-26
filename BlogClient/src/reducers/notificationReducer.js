import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: '', timeoutId: -1, type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification(state, action) {
      if (state.timeoutId !== -1) clearTimeout(state.timeoutId)

      return initialState
    },
    setNotificationRe(state, action) {
      if (state.timeoutId !== -1) clearTimeout(state.timeoutId)

      return action.payload
    },
  },
})

const { resetNotification, setNotificationRe } = notificationSlice.actions

export const setNotificationSuccess = (content) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)

    dispatch(setNotificationRe({ timeoutId, content, type: 'success' }))
  }
}

export const setNotificationInfo = (content) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)

    dispatch(setNotificationRe({ timeoutId, content, type: 'info' }))
  }
}

export const setNotificationError = (content) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)

    dispatch(setNotificationRe({ timeoutId, content, type: 'danger' }))
  }
}

export default notificationSlice.reducer
