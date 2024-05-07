import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postComment, putBlog, removeBlog } from '../reducers/blogReducer'
import FormValue from './FormValue'
import { Button, Form, ListGroup, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = async (e) => {
    e.preventDefault()

    dispatch(postComment(blog.id, { comment }))

    setComment('')
  }

  return (
    <Form className="blogCommentForm" onSubmit={handleComment}>
      <FormValue
        key="comment"
        label="Post a comment"
        value={comment}
        name="BlogComment"
        setValue={setComment}
      ></FormValue>
      <Button variant="primary" size="sm" type="submit">
        submit
      </Button>
    </Form>
  )
}

const Blog = ({ blog, user, deleteCallback, enableHide, useStyle }) => {
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
        <LinkContainer to={`/blogs/${blog.id}`}>
          <Button variant="light" id="blogTitleAuthor">
            {blog.title} - {blog.author}
          </Button>
        </LinkContainer>
        <Button variant="info" size="sm" onClick={handleVisibility}>
          {buttonText}
        </Button>
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
      style={
        useStyle
          ? {
              margin: '7px',
              padding: '4px',
              border: 'solid',
              borderWidth: '1px',
            }
          : {}
      }
    >
      <div className="blogTitleAuthor">{enableHide ? hiddenTitle() : normalTitle()}</div>
      <div name="ExtraBlogInfo" style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div className="blogLikes">
          likes: {blog.likes}{' '}
          {user && (
            <Button variant="secondary" size="sm" onClick={handleLike}>
              like
            </Button>
          )}
        </div>
        <div>uploaded by: {blog.user.name}</div>
        {user && blog.user.user === user.username && (
          <Button variant="danger" size="sm" onClick={handleRemoveBlog}>
            delete
          </Button>
        )}

        <hr />

        <div style={{ margin: '5px 5px' }}>
          <h4>Comments</h4>
          <div style={{ margin: '10px' }}>
            <CommentForm blog={blog}></CommentForm>
            <ListGroup>
              {blog.comments.map((c, i) => (
                <ListGroup.Item variant="dark" key={i}>
                  {c}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
