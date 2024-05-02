import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { putBlog, removeBlog } from '../reducers/blogReducer'
import LoginHeader from './LoginHeader'
import Blog from './Blog'

const BlogView = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id))

  if (!blog) {
    return <div>blog not found</div>
  }

  const deleteCallback = (data) => {
    navigate('/')
  }

  return (
    <div>
      <LoginHeader user={user}></LoginHeader>
      <Blog key={blog.id} blog={blog} user={user} enableHide={false} deleteCallback={deleteCallback} />
    </div>
  )
}

export default BlogView
