import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
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
      <Blog key={blog.id} blog={blog} user={user} enableHide={false} useStyle={true} deleteCallback={deleteCallback} />
    </div>
  )
}

export default BlogView
