import { useDispatch, useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { initBlogs, postBlog, putBlog, removeBlog } from '../reducers/blogReducer'
import { initUser, resetUser, setUser } from '../reducers/userReducer'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginHeader from './LoginHeader'

const blogSorter = (a, b) => {
  if (a.likes === b.likes) return 0
  return a.likes < b.likes ? 1 : -1
}

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogSelect = useSelector(({ blogs }) => blogs)
  const blogs = [...blogSelect].sort(blogSorter)

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

  const renderBlogForm = () => {
    return (
      <Toggleable startVisible={false} buttonLabel={'Add blog'} ref={blogFormRef}>
        <h3>Create new blog</h3>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
    )
  }

  return (
    <div>
      <LoginHeader user={user}></LoginHeader>
      <h2>Blogs</h2>
      <div>
        {user && renderBlogForm()}
        <h3>Blogs list</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={handleRemoveBlog} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
