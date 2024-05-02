import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetUser } from '../reducers/userReducer'

const LoginHeader = ({ user, style }) => {
  const dispatch = useDispatch()

  const logout = (input) => {
    dispatch(resetUser())
  }

  if (user) {
    return (
      <a style={style} name="login">
        {user.name} logged in <button onClick={logout}>Logout</button>
      </a>
    )
  } else {
    return (
      <Link style={style} to="/login">
        login
      </Link>
    )
  }
}

export default LoginHeader
