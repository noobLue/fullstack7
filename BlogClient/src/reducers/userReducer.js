import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotificationError } from './notificationReducer'

const initialState = null
const userStorageKey = 'loggedBlogAppUser'

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserRe(state, action) {
      return initialState
    },
    setUserRe(state, action) {
      return action.payload
    },
  },
})

const { resetUserRe, setUserRe } = userSlice.actions

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(userStorageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch(setUserRe(user))
    }
  }
}

export const setUser = (username, password, callback) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(userStorageKey, JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUserRe(user))

      callback()
    } catch (exception) {
      dispatch(setNotificationError('Credentials were wrong'))
    }
  }
}

export const resetUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(userStorageKey)
    dispatch(resetUserRe())
  }
}

export default userSlice.reducer
