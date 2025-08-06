import { AuthContext } from './AuthContext'
import { useNotification } from '../../hooks/useNotification'
import { useState, useEffect } from 'react'
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const stored = localStorage.getItem('is-authenticated')
  return stored !== null ? JSON.parse(stored) : false
  })
  const [loading, setLoading] = useState(false)

  const saveAuthToLocalStorage = () => {
    const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
    setIsAuthenticated(true)

    localStorage.setItem('is-authenticated', JSON.stringify(true));
    localStorage.setItem('auth-expiration', expirationTime.toString());

    // Set up automatic logout
    setTimeout(() => {
      localStorage.removeItem('is-authenticated');
      localStorage.removeItem('auth-expiration');
      setIsAuthenticated(false);
    }, 60 * 60 * 1000);
  };

  const loadAuthFromLocalStorage = () => {
    const isAuth = JSON.parse(localStorage.getItem('is-authenticated'));
    const expiration = parseInt(localStorage.getItem('auth-expiration'), 10);

    if (!isAuth || !expiration || Date.now() > expiration) {
      localStorage.removeItem('is-authenticated');
      localStorage.removeItem('auth-expiration');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);

      // Set remaining timeout to auto-logout
      const timeLeft = expiration - Date.now();
      setTimeout(() => {
        localStorage.removeItem('is-authenticated');
        localStorage.removeItem('auth-expiration');
        setIsAuthenticated(false);
      }, timeLeft);
    }
  };

  const checkAuthenticatedSessionTime = () => {
    const authExpiration = localStorage.getItem('auth-expiration') ? parseInt(localStorage.getItem('auth-expiration'), 10) : null

    const timeLeft = authExpiration - Date.now()

    if (timeLeft <= 0) {
      return "You do not have any time left"
    } else {
      const totalMinutes = Math.floor(timeLeft / (1000 * 60))
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60

      return `✅ Time until cookie expires: ${hours}h ${minutes}m`
    }

    }

  useEffect(() => {
    loadAuthFromLocalStorage();
  }, []);

  const checkAuth = () => {
    loadAuthFromLocalStorage()

    try {
      if (isAuthenticated) {
        return true
      } else {
        addNotification({
          headerText: 'Access Denied',
          bodyText: 'User is not authorized to view content or perform specified action',
          imgURL: '/assets/error.jpg',
          variantTheme: 'danger',
          customTheme: '.toast-error'
        })
        return false
      }
    } catch (err) {
      addNotification({
        headerText: 'Error',
        bodyText: err,
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error'
      })
      console.error('❌ checkAuth error:', err)
    }
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
      setUserInfo({ name, email })
      addNotification({
        headerText: 'Success',
        bodyText: 'You have successfully logged in.',
        imgURL: '/assets/success.png',
        variantTheme: 'success',
        customTheme: '.toast-success'
      })
      navigate('/dashboard')
      saveAuthToLocalStorage()
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
      navigate('/')
      return { success: false, error: res.error }
    }
    navigate('/')
    return null
  }

  const logout = async () => {
    const res = await fetcher(`${baseUrl}/auth/logout`, {
      method: 'POST',
    })

    if (res.success) {
      setUserInfo({ name: '', email: '' })
      setSuccess(true)
      localStorage.getItem('is-authenticated') ? localStorage.removeItem('is-authenticated') : null;
      localStorage.getItem('auth-expiration') ? localStorage.removeItem('auth-expiration') : null;
      setIsAuthenticated(false);
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
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
