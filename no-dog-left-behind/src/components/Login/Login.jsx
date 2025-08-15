import './login.css'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { error, success, loading, setLoading, handleChange, handleSubmit, setShowLogin, showLogin } = useAuth()

  useEffect(() => {
    if (loading) {
      new Promise((resolve) => setTimeout(resolve, 2000)).then(() => setLoading(false))
    }
  }, [loading, setLoading])

  return (
    showLogin && (
      <div className="login-overlay">
        <div className="login-modal">
          <Button
            className="login-close-btn"
            onClick={() => setShowLogin(prev => !prev)}
          >
            ✕
          </Button>

          <div className="login-content">
            <img
              src="/assets/dog-login-logo.png"
              alt="No Dog Left Behind Logo"
              className="login-logo"
            />
            <h2>No Dog Left Behind</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                autoComplete="off"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
                autoComplete="off"
                required
              />
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Logging In…' : 'Log In'}
              </Button>
            </form>
            <div className="login-links">
              <a href="#">Learn More About Us</a>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Login
