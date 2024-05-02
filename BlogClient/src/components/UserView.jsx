import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)

  if (!user) return <div>user not found</div>

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      {user.blogs.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </div>
  )
}

export default UserView
