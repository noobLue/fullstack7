import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser, resetUser } from './reducers/userReducer'

import userService from './services/users'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import { Button, Nav, NavItem, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavItemRouter = ({ link, text }) => {
  return (
    <NavItem>
      <LinkContainer to={link}>
        <Nav.Link>{text}</Nav.Link>
      </LinkContainer>
    </NavItem>
  )
}

const LoggedIn = ({ user }) => {
  const dispatch = useDispatch()

  const logout = (input) => {
    dispatch(resetUser())
  }

  return (
    <NavItem>
      {user.name} logged in{' '}
      <Button variant="danger" size="sm" onClick={logout}>
        Logout
      </Button>
    </NavItem>
  )
}

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
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="me-auto">
              <NavItemRouter link="/" text="Blogs" />
              <NavItemRouter link="/users" text="Users" />
              {!user && <NavItemRouter link="/login" text="Login" />}
            </Nav>
          </Navbar.Collapse>
          {user && <LoggedIn user={user} />}
        </Navbar>
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
    </div>
  )
}

export default App
