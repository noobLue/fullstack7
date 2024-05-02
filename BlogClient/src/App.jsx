import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

import userService from './services/users'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

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
        <Route path="/users/:id" element={<UserView users={users} user={user} />}></Route>
        <Route path="/users" element={<UsersView users={users} user={user} />}></Route>
        <Route path="/" element={<Blogs user={user} />}></Route>
      </Routes>
    </Router>
  )
}

export default App
