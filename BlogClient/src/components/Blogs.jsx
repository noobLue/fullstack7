import { useDispatch, useSelector } from 'react-redux'
import Toggleable from './Toggleable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { postBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { Table } from 'react-bootstrap'

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
      <h2>Blogs</h2>
      <div>
        {user && renderBlogForm()}
        <h3>Blogs list</h3>
        <Table striped>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Blog blog={blog} user={user} deleteCallback={(data) => {}} enableHide={true} useStyle={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Blogs
