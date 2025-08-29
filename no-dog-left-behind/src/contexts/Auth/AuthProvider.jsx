import { AuthContext } from './AuthContext'
import { useState, useEffect, useRef } from 'react'
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
  const logoutTimerRef = useRef(null)

  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem('is-authenticated')
      return stored !== null ? JSON.parse(stored) : false
    } catch {
      return false
    }
  })
  const [loading, setLoading] = useState(false)

  // === Restore state from localStorage on mount ===
  useEffect(() => {
    loadAuthFromLocalStorage()
    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
    }
  }, [])

  const clearAuth = () => {
    localStorage.removeItem('is-authenticated')
    localStorage.removeItem('auth-expiration')
    localStorage.removeItem('user-name')
    localStorage.removeItem('favorite-dogs')
    localStorage.removeItem('favorite-dogs-ids')
    localStorage.removeItem('notifications')
    localStorage.removeItem('disable-notifications')
    setIsAuthenticated(false)
    setUserInfo({ name: '', email: '' })
  }

  const scheduleLogout = (timeLeft) => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
    logoutTimerRef.current = setTimeout(() => {
      clearAuth()
    }, timeLeft)
  }

  const saveAuthToLocalStorage = (name) => {
    const expiration = Date.now() + 60 * 60 * 1000 // 1 hour
    setIsAuthenticated(true)

    localStorage.setItem('is-authenticated', JSON.stringify(true))
    localStorage.setItem('auth-expiration', expiration.toString())
    localStorage.setItem('user-name', JSON.stringify(name))

    scheduleLogout(60 * 60 * 1000)
  }

  const loadAuthFromLocalStorage = () => {
    try {
      const isAuth = JSON.parse(localStorage.getItem('is-authenticated'))
      const expiration = parseInt(localStorage.getItem('auth-expiration'), 10)
      const userName = JSON.parse(localStorage.getItem('user-name'))

      if (!isAuth || !expiration || Date.now() > expiration || !userName) {
        clearAuth()
      } else {
        setIsAuthenticated(true)
        setUserInfo((prev) => ({ ...prev, name: userName }))
        scheduleLogout(expiration - Date.now())
      }
    } catch {
      clearAuth()
    }
  }

  // 🔄 Replace hook misuse — compute timeLeft at top-level
  const expiration = parseInt(localStorage.getItem('auth-expiration'), 10)
  const timeLeft = expiration ? expiration - Date.now() : 0
  const remainingTime = useTimeLeft(timeLeft)

  const checkAuth = () => {
    loadAuthFromLocalStorage()
    return isAuthenticated
  }

  const notifyIfUnauthed = () => {
    if (!checkAuth()) {
      addNotification({
        headerText: 'Access Denied',
        bodyText:
          'User is not authorized to view content or perform specified action',
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error',
      })
      return false
    }
    return true
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
      saveAuthToLocalStorage(name)

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
      clearAuth()
      setSuccess(true)

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
        notifyIfUnauthed,
        showLogin,
        setShowLogin,
        remainingTime,
        expirationTime: expiration || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
