import Login from '../Login/Login'
import { useAuth } from '../../hooks/useAuth'

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Component /> : <Login />
}

export default PrivateRoute
