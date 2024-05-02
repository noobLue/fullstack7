import { Link } from 'react-router-dom'
import LoginHeader from './LoginHeader'

const UserInfo = ({ user }) => {
  return (
    <tr>
      <th>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </th>
      <th>{user.blogs.length}</th>
    </tr>
  )
}

const UsersView = ({ users, user }) => {
  return (
    <div>
      <LoginHeader user={user}></LoginHeader>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <UserInfo key={u.id} user={u}></UserInfo>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
