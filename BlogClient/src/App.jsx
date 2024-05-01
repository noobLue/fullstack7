import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, postBlog, putBlog, removeBlog } from './reducers/blogReducer'
import { initUser, resetUser, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const error = useSelector(({ notification }) => notification.content)
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())

    dispatch(initUser())
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(setUser(username, password))
  }

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility(false)
    dispatch(postBlog(blog))
  }

  const addLike = async (blog) => {
    dispatch(putBlog(blog))
  }

  const handleRemoveBlog = async (blog) => {
    dispatch(removeBlog(blog))
  }

  const logout = (input) => {
    dispatch(resetUser())
  }

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          ></input>
          password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          ></input>
          <button type="submit">login</button>
        </div>
      </form>
    )
  }

  const UserBlog = () => {
    return (
      <div>
        <p>
          {user.name} logged in <button onClick={logout}>Logout</button>
        </p>
        <Toggleable startVisible={false} buttonLabel={'Add blog'} ref={blogFormRef}>
          <h3>Create new blog</h3>
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        <h3>Blogs list</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={handleRemoveBlog} />
        ))}
      </div>
    )
  }

  const ErrorMessage = () => {
    if (!error) return <div></div>

    return (
      <div
        style={{
          background: 'lightgray',
          border: '2px',
          borderStyle: 'solid',
          borderColor: 'gray',
          fontSize: '20px',
          padding: '10px',
          margin: '5px',
        }}
      >
        {error}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {ErrorMessage()}
      {user === null ? LoginForm() : UserBlog()}
    </div>
  )
}

export default App
