import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetUser } from '../reducers/userReducer'

const LoginHeader = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = (input) => {
    dispatch(resetUser())

    //navigate('/login')
  }

  const logged = () => {
    return (
      <p>
        {user.name} logged in <button onClick={logout}>Logout</button>
      </p>
    )
  }

  const notLogged = () => {
    return (
      <p>
        Not logged in <Link to="/login">Login</Link>
      </p>
    )
  }

  return <div>{user ? logged() : notLogged()}</div>
}

export default LoginHeader
