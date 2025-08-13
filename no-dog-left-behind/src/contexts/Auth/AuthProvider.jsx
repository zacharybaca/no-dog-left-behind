import { AuthContext } from './AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks/useNotification'
import { useVerifyEmailAddress } from '../../hooks/useVerifyEmailAddress'
import { useFetcher } from '../../hooks/useFetcher'
import { useTimeLeft } from '../../hooks/useFormatTimeLeft'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const AuthProvider = ({ children }) => {
  const { addNotification } = useNotification()
  const { verifyEmailAddress } = useVerifyEmailAddress()
  const { fetcher } = useFetcher()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('is-authenticated')
    return stored !== null ? JSON.parse(stored) : false
  })
  const [loading, setLoading] = useState(false)

  const saveAuthToLocalStorage = () => {
  const expiration = Date.now() + 60 * 60 * 1000 // 1 hour
  setIsAuthenticated(true)
  setExpirationTime(expiration)

  localStorage.setItem('is-authenticated', JSON.stringify(true))
  localStorage.setItem('auth-expiration', expiration.toString())

  setTimeout(() => {
    localStorage.removeItem('is-authenticated')
    localStorage.removeItem('auth-expiration')
    setIsAuthenticated(false)
    setExpirationTime(null)
  }, 60 * 60 * 1000)
}

  const loadAuthFromLocalStorage = () => {
  const isAuth = JSON.parse(localStorage.getItem('is-authenticated'))
  const expiration = parseInt(localStorage.getItem('auth-expiration'), 10)

  if (!isAuth || !expiration || Date.now() > expiration) {
    localStorage.removeItem('is-authenticated')
    localStorage.removeItem('auth-expiration')
    setIsAuthenticated(false)
  } else {
    setIsAuthenticated(true)
    const timeLeft = expiration - Date.now()
    setTimeout(() => {
      localStorage.removeItem('is-authenticated')
      localStorage.removeItem('auth-expiration')
      setIsAuthenticated(false)
    }, timeLeft)
  }}

  const getSessionExpirationTimeMessage = () => {
    const expiration = parseInt(localStorage.getItem('auth-expiration'), 10)
    const timeLeft = expiration - Date.now()

    if (!expiration || timeLeft <= 0) return 0

    // const totalMinutes = Math.floor(timeLeft / (1000 * 60))
    // const hours = Math.floor(totalMinutes / 60)
    // const minutes = totalMinutes % 60

    // return `✅ Time until cookie expires: ${hours}h ${minutes}m`
    const remainingTime = useTimeLeft(timeLeft)
    return remainingTime;
  }

  useEffect(() => {
    loadAuthFromLocalStorage()
  }, [])

  const checkAuth = () => {
    loadAuthFromLocalStorage()
    if (isAuthenticated) return true

    addNotification({
      headerText: 'Access Denied',
      bodyText: 'User is not authorized to view content or perform specified action',
      imgURL: '/assets/error.jpg',
      variantTheme: 'danger',
      customTheme: '.toast-error',
    })
    return false
  }

  const login = async (name, email) => {
    if (!name || !email) {
      const fallbackError = 'Please enter both your name and e-mail address.'
      setError(fallbackError)
      addNotification({
        headerText: 'Error',
        bodyText: fallbackError,
        imgURL: '/assets/warning.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-warm',
      })
      return { success: false, error: fallbackError }
    }

    const verification = await verifyEmailAddress(email)
    console.log('✅ Email Verification Result:', verification)

    if (verification.status !== 'E-mail Approved') {
      addNotification({
        headerText: 'Access Denied',
        bodyText: 'E-mail verification failed.',
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error',
      })
      return { success: false, error: 'E-mail not approved' }
    }

    const res = await fetcher(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    if (res.success) {
      setSuccess(true)
      setShowLogin(false)
      setUserInfo({ name, email })
      saveAuthToLocalStorage()

      addNotification({
        headerText: 'Success',
        bodyText: 'You have successfully logged in.',
        imgURL: '/assets/success.png',
        variantTheme: 'success',
        customTheme: '.toast-success',
      })

      return { success: true }
    } else {
      const errMsg = res.error || 'Login failed'
      setError(errMsg)
      setSuccess(false)
      setShowLogin(true)
      setIsAuthenticated(false)

      addNotification({
        headerText: 'Error',
        bodyText: errMsg,
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error',
      })

      return { success: false, error: errMsg }
    }
  }

  const logout = async () => {
    const res = await fetcher(`${baseUrl}/auth/logout`, { method: 'POST' })

    if (res.success) {
      setUserInfo({ name: '', email: '' })
      setSuccess(true)
      localStorage.removeItem('is-authenticated')
      localStorage.removeItem('auth-expiration')
      setIsAuthenticated(false)

      addNotification({
        headerText: 'Success',
        bodyText: 'You have been logged out.',
        imgURL: '/assets/success.png',
        variantTheme: 'success',
        customTheme: '.toast-success',
      })

      return { success: true }
    } else {
      addNotification({
        headerText: 'Error',
        bodyText: res.error,
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error',
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
    console.log('Result From Submitting: ', result)
    setLoading(false)

    if (result.success) {
      setShowLogin(false)
      navigate('/dashboard')
    } else {
      setShowLogin(true)
      navigate('/')
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
        checkAuth,
        showLogin,
        setShowLogin,
        getSessionExpirationTimeMessage,
        expirationTime: parseInt(localStorage.getItem('auth-expiration'), 10) || null
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
