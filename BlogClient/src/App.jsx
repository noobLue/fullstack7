import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, postBlog, putBlog, removeBlog } from './reducers/blogReducer'
import { initUser, resetUser, setUser } from './reducers/userReducer'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())

    dispatch(initUser())
  }, [])

  return (
    <Router>
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/" element={<Blogs />}></Route>
      </Routes>
    </Router>
  )
}

export default App
