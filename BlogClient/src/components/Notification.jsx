import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { content, type } = useSelector(({ notification }) => notification)
  if (!content) return <div></div>

  return <Alert variant={type}>{content}</Alert>
}

export default Notification
