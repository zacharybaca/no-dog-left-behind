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
  const [loading, setLoading] = useState(false)

  const login = async (name, email) => {
    if (!name || !email) {
      const fallbackError = 'Please enter both your name and e-mail address.'
      setError(fallbackError)
      addNotification({
        headerText: 'Error',
        bodyText: fallbackError,
        imgURL: '/assets/warning.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-warm'
      })
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
      addNotification({
        headerText: 'Success',
        bodyText: 'You have successfully logged in.',
        imgURL: '/assets/success.png',
        variantTheme: 'success',
        customTheme: '.toast-success'
      })
      return { success: true }
    } else if (!res.success) {
      setError(res.error)
      setSuccess(false)
      setIsAuthenticated(false)
      addNotification({
        headerText: 'Error',
        bodyText: res.error,
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error'
      })
      return { success: false, error: res.error }
    }
    return null
  }

  const logout = async () => {
    const res = await fetcher(`${baseUrl}/auth/logout`, {
      method: 'POST',
    })

    if (res.success) {
      setUserInfo({ name: '', email: '' })
      setSuccess(true)
      setIsAuthenticated(false)
      addNotification({
        headerText: 'Success',
        bodyText: 'You have been logged out.',
        imgURL: '/assets/success.png',
        variantTheme: 'success',
        customTheme: '.toast-success'
      })
      return { success: true }
    } else {
      addNotification({
        headerText: 'Error',
        bodyText: res.error,
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error'
      })
      return { success: false, error: res.error }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(userInfo.name, userInfo.email)

    if (result.success) {
      setLoading(false)
      navigate('/dashboard')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        error,
        isAuthenticated,
        loading,
        setLoading,
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
