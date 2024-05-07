import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormValue from './FormValue'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    setUsername('')
    setPassword('')

    dispatch(setUser(username, password, () => navigate('/')))
  }

  return (
    <Form onSubmit={handleLogin}>
      <FormValue key="username" label="username" value={username} name="BlogTitle" setValue={setUsername}></FormValue>
      <FormValue
        key="password"
        label="password"
        value={password}
        name="BlogTitle"
        setValue={setPassword}
        type="password"
      ></FormValue>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
