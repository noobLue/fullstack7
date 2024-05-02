import { useEffect, useState } from 'react'
import userService from '../services/users'
import LoginHeader from './LoginHeader'
import { useSelector } from 'react-redux'

const UserInfo = ({ user }) => {
  return (
    <tr>
      <th>{user.name}</th>
      <th>{user.blogs.length}</th>
    </tr>
  )
}

const UsersView = () => {
  const [users, setUsers] = useState([])
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

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
