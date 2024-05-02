import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)

  const handleLogin = (e) => {
    e.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(setUser(username, password))
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        ></input>
        password{' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        ></input>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm
