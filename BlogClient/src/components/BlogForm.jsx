import { useState } from 'react'
import FormValue from './FormValue'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (e) => {
    e.preventDefault()

    await createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form className="blogForm" onSubmit={handleBlog}>
      <FormValue key="title" label="title" value={title} name="BlogTitle" setValue={setTitle}></FormValue>
      <FormValue key="author" label="author" value={author} name="BlogAuthor" setValue={setAuthor}></FormValue>
      <FormValue key="url" label="url" value={url} name="BlogUrl" setValue={setUrl}></FormValue>
      <Button variant="primary" type="submit">
        submit
      </Button>
    </Form>
  )
}

export default BlogForm
