import { useSelector } from 'react-redux'

const Notification = () => {
  const error = useSelector(({ notification }) => notification.content)
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

export default Notification
