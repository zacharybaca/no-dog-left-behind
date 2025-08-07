import './log-out.css'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../hooks/useAuth'
import { useMenuOptions } from '../../hooks/useMenuOptions'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout, isAuthenticated, setShowLogin } = useAuth()
  const { setMenuOpen } = useMenuOptions()
  const navigate = useNavigate()

  const handleClick = async () => {
    if (isAuthenticated) {
      await logout()
      setShowLogin(prev => !prev)
    } else {
      setMenuOpen(false)
      setShowLogin(true)
      navigate('/')
    }
  }

  return (
    <Button type="button" className="logout-button" onClick={() => handleClick()}>
      <i className="bi bi-box-arrow-right me-2"></i> {isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  )
}

export default Logout
