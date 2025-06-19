import './log-out.css'
import Button from 'react-bootstrap/Button'

const Logout = () => {
  return (
    <Button type="button" className="logout-button">
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </Button>
  )
}

export default Logout
