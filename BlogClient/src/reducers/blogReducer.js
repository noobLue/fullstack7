import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    const data = await blogService.postBlog(blog)
    dispatch(addBlog(data))
  }
}

export const putBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.putBlog(blog)
    dispatch(editBlog(data))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.deleteBlog(blog)
    dispatch(deleteBlog(data))
  }
}

export default blogSlice.reducer
