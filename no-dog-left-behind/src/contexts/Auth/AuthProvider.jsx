import { AuthContext } from './AuthContext'
import { useNotification } from '../../hooks/useNotification'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from '../../hooks/useFetcher'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const AuthProvider = ({ children }) => {
  const { addNotification } = useNotification()
  const { fetcher } = useFetcher()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (name, email) => {
    if (!name || !email) {
      const fallbackError = 'Please enter both your name and e-mail address.'
      setError(fallbackError)
      addNotification('Login Error', fallbackError, '/assets/warning.jpg', 'danger', '.toast-warm')
      return { success: false, error: fallbackError }
    }

    const res = await fetcher(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })

    if (res.success) {
      setSuccess(true)
      setIsAuthenticated(true)
      setUserInfo({ name, email })
      addNotification('Login Successful', 'You have successfully logged in.', '/assets/success.png', 'success', '.toast-success')
      return { success: true }
    } else {
      setError(res.error)
      setSuccess(false)
      setIsAuthenticated(false)
      addNotification('Login Error', res.error, '/assets/error.jpg', 'danger', '.toast-error')
      return { success: false, error: res.error }
    }
  }

  const logout = async () => {
    const res = await fetcher(`${baseUrl}/auth/logout`, {
      method: 'POST',
    })

    if (res.success) {
      setUserInfo({ name: '', email: '' })
      setSuccess(true)
      setIsAuthenticated(false)
      addNotification('Logout Successful', 'You have been logged out.', '/assets/success.png', 'success', '.toast-success')
      return { success: true }
    } else {
      addNotification('Logout Error', res.error, '/assets/error.jpg', 'danger', '.toast-error')
      return { success: false, error: res.error }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(userInfo.name, userInfo.email)

    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        error,
        isAuthenticated,
        setError,
        success,
        login,
        logout,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
