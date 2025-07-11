import { FetcherContext } from './FetcherContext.jsx'
import { useNotification } from '../../hooks/useNotification.js'
import { useState } from 'react';

export const FetcherProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { addNotification } = useNotification()

  const fetcher = async (url, options = {}, fallbackError = 'An error occurred.') => {
    const config = { credentials: 'include', ...options }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        let message
        try {
          const data = await response.json()
          message = data.message
        } catch {
          message = fallbackError
        }

        const errorMessage = message || fallbackError

        if (response.status === 401) {
          addNotification(
            'User Not Authenticated',
            'You are not authorized to access this content.',
            '/assets/warning.jpg',
            'danger',
            '.toast-warm'
          )
        } else if (!response.ok) {
          addNotification(
            'Request Failed',
            errorMessage,
            '/assets/error.jpg',
            'danger',
            '.toast-error'
          )
        }
        setIsLoaded(true)
        return { success: false, error: errorMessage, status: response.status }
      }

      const data = await response.json()
      setIsLoaded(true)
      return { success: true, data }

    } catch (err) {
      addNotification(
        'Network Error',
        'Unable to reach the server.',
        '/assets/error.jpg',
        'danger',
        '.toast-error'
      )
      setIsLoaded(true)
      return { success: false, error: 'Network error', status: null }
    }
  }

  return (
    <FetcherContext.Provider value={{ fetcher, isLoaded }}>
      {children}
    </FetcherContext.Provider>
  )
}
