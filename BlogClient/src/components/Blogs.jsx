import { useDispatch, useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { initBlogs, postBlog, putBlog, removeBlog } from '../reducers/blogReducer'
import { initUser, resetUser, setUser } from '../reducers/userReducer'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const blogSorter = (a, b) => {
  if (a.likes === b.likes) return 0
  return a.likes < b.likes ? 1 : -1
}

const Blogs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  const blogSelect = useSelector(({ blogs }) => blogs)
  const blogs = [...blogSelect].sort(blogSorter)
  const user = useSelector(({ user }) => user)

  // TODO: Doesn't work, user is null on first render
  /*
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])
  */

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility(false)
    dispatch(postBlog(blog))
  }

  const addLike = (blog) => {
    dispatch(putBlog(blog))
  }

  const handleRemoveBlog = (blog) => {
    dispatch(removeBlog(blog))
  }

  const logout = (input) => {
    dispatch(resetUser())

    navigate('/login')
  }

  if (!user) {
    return (
      <div>
        If the login page doesn&apos;t load, navigate there manually <Link to="/login">Login page</Link>
      </div>
    )
  }

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

export default Blogs
