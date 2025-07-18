import './login.css'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { error, success, loading, setLoading, handleChange, handleSubmit, login, userInfo } = useAuth()

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
          autoComplete="off"
          required
        />
        <label htmlFor="email">Please Enter Your E-mail Address: </label>
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
          {loading ? 'Logging In…' : 'Login'}
        </Button>
      </form>
    </div>
  )
}

export default Login
