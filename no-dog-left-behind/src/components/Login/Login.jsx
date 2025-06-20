import './login.css'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { error, success, handleChange, handleSubmit, login, userInfo } = useAuth()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
    }

    if (loading) {
      simulateNetworkRequest().then(() => {
        setLoading(false)
      })
    }
  }, [loading])

  const handleClick = () => {
    setLoading(true);
    login(userInfo.name, userInfo.email);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/assets/paw-print-image.jpg" alt="Paw Print" className="login-bg" />
        <h2>Welcome Back</h2>
        <label htmlFor="name">Please Enter Your Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <label htmlFor="email">Please Enter Your E-mail Address: </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
          required
        />
        <Button variant="primary" disabled={loading} onClick={!loading ? handleClick : null}>
          {loading ? 'Logging In…' : 'Login'}
        </Button>
      </form>
    </div>
  )
}

export default Login
