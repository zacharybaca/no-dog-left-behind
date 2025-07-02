import './log-out.css'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  }

  return (
    <Button type="button" className="logout-button" onClick={handleClick}>
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </Button>
  )
}

export default Logout
