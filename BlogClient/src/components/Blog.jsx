import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { putBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, deleteCallback, enableHide }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(enableHide ? false : true)
  const [buttonText, setButtonText] = useState('show')

  useEffect(() => {
    setButtonText(visible ? 'hide' : 'show')
  }, [visible])

  const handleVisibility = async (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleRemoveBlog = async (e) => {
    e.preventDefault()

    if (user && window.confirm(`Do you want to remove blog '${blog.title}' by '${blog.author}'`)) {
      dispatch(removeBlog({ ...blog, user: blog.user.id }, deleteCallback))
    }
  }

  const handleLike = async (e) => {
    e.preventDefault()

    if (user) {
      dispatch(putBlog({ ...blog, user: blog.user.id, likes: blog.likes + 1 }))
    }
  }

  const hiddenTitle = () => {
    return (
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>{' '}
        <button onClick={handleVisibility}>{buttonText}</button>
      </div>
    )
  }

  const normalTitle = () => {
    return (
      <h3>
        {blog.title} - {blog.author}
      </h3>
    )
  }

  return (
    <div
      className="blog"
      style={{
        margin: '7px',
        padding: '4px',
        border: 'solid',
        borderWidth: '1px',
      }}
    >
      <div className="blogTitleAuthor">{enableHide ? hiddenTitle() : normalTitle()}</div>
      <div name="ExtraBlogInfo" style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div className="blogLikes">
          likes: {blog.likes} {user && <button onClick={handleLike}>like</button>}
        </div>
        <div>uploaded by: {blog.user.name}</div>
        {user && blog.user.user === user.username && <button onClick={handleRemoveBlog}>delete</button>}
        <div>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
