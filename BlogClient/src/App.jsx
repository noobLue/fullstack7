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
import BlogView from './components/BlogView'
import LoginHeader from './components/LoginHeader'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const [users, setUsers] = useState([])
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [])

  // update users when blogs change
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [blogs])

  return (
    <Router>
      <div>
        <Link style={{ padding: 3 }} to={'/'}>
          blogs
        </Link>
        <Link style={{ padding: 3 }} to={'/users'}>
          users
        </Link>
        <LoginHeader style={{ padding: 3 }} user={user}></LoginHeader>
      </div>
      <h1>Blogs app</h1>
      <Notification />
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/users/:id" element={<UserView users={users} />}></Route>
        <Route path="/users" element={<UsersView users={users} />}></Route>
        <Route path="/blogs/:id" element={<BlogView user={user} />}></Route>
        <Route path="/" element={<Blogs user={user} />}></Route>
      </Routes>
    </Router>
  )
}

export default App
