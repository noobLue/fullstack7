import { useParams } from 'react-router-dom'
import LoginHeader from './LoginHeader'

const UserView = ({ users, user }) => {
  const { id } = useParams()
  const user2 = users.find((u) => u.id === id)

  if (!user2) return <div>user not found</div>

  return (
    <div>
      <LoginHeader user={user}></LoginHeader>
      <h2>{user2.name}</h2>

      <h3>Added blogs</h3>
      {user2.blogs.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </div>
  )
}

export default UserView
