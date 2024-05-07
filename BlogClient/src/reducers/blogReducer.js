import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotificationError, setNotificationSuccess } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetBlogs(state, action) {
      return initialState
    },
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    editBlog(state, action) {
      return state.map((b) => (b.id !== action.payload.id ? b : action.payload))
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    },
  },
})

const { resetBlogs, setBlogs, addBlog, editBlog, deleteBlog } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch(setBlogs(data))
  }
}

export const postBlog = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.postBlog(blog)
      dispatch(addBlog(data))

      dispatch(setNotificationSuccess(`Added a new blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotificationError('Failed to add new blog'))
    }
  }
}

export const putBlog = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.putBlog(blog)
      dispatch(editBlog(data))
    } catch (exception) {
      dispatch(setNotificationError('Failed to make changes to blog'))
    }
  }
}

export const removeBlog = (blog, deleteCallback) => {
  return async (dispatch) => {
    try {
      const data = await blogService.deleteBlog(blog)
      dispatch(deleteBlog(data))

      deleteCallback(data)

      dispatch(setNotificationSuccess(`Removed blog '${data.title}' by '${data.author}'`))
    } catch (exception) {
      dispatch(setNotificationError('Failed to remove blog'))
    }
  }
}

export const postComment = (blogId, commentObj) => {
  return async (dispatch) => {
    try {
      const data = await blogService.postComment(blogId, commentObj)

      dispatch(editBlog(data))

      dispatch(setNotificationSuccess(`Posted comment '${commentObj.comment}' to '${data.title}'`))
    } catch (exception) {
      dispatch(setNotificationError('Failed to add comment'))
    }
  }
}

export default blogSlice.reducer
