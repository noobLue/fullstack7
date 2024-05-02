import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, postBlog, putBlog, removeBlog } from './reducers/blogReducer'
import { initUser, resetUser, setUser } from './reducers/userReducer'

import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initBlogs())

    dispatch(initUser())
  }, [])

  return (
    <Router>
      <h1>Blogs app</h1>
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/users" element={<UsersView />}></Route>
        <Route path="/" element={<Blogs />}></Route>
      </Routes>
    </Router>
  )
}

export default App
