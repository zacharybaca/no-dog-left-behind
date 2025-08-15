// import './login.css'
// import { useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
// import { useAuth } from '../../hooks/useAuth'

// const Login = () => {
//   const { error, success, loading, setLoading, handleChange, handleSubmit, setShowLogin, showLogin } = useAuth()

//   useEffect(() => {
//     function simulateNetworkRequest() {
//       return new Promise((resolve) => setTimeout(resolve, 2000))
//     }

//     if (loading) {
//       simulateNetworkRequest().then(() => setLoading(false))
//     }
//   }, [loading, setLoading])

//   return (
//     showLogin && <div className="login-overlay">
//       <div className="login-modal">
//         <Button className="login-close-btn" onClick={() => setShowLogin(prev => !prev)}>
//           <img src="/assets/cross-close-icon.png" alt="close button" className="login-close-btn" />
//         </Button>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <img src="/assets/paw-print-image.jpg" alt="Paw Print" className="login-bg" />
//           <h2>Welcome Back</h2>

//           <label htmlFor="name">Please Enter Your Name: </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             onChange={handleChange}
//             placeholder="Name"
//             autoComplete="off"
//             required
//           />

//           <label htmlFor="email">Please Enter Your E-mail Address: </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             onChange={handleChange}
//             placeholder="E-mail"
//             autoComplete="off"
//             required
//           />

//           <Button type="submit" variant="primary" disabled={loading}>
//             {loading ? 'Logging In…' : 'Login'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

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
              src="/assets/paw-print-image.jpg"
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
              <a href="#">Forgot password?</a>
              <span> | </span>
              <a href="#">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Login
