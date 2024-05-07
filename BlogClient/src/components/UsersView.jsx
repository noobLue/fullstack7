import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

const UsersView = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>

      <Table striped>
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
      </Table>
    </div>
  )
}

export default UsersView
