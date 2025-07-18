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
          addNotification({
            headerText: 'Error',
            bodyText: 'You are not authorized to access this content.',
            imgURL: '/assets/warning.jpg',
            variantTheme: 'danger',
            customTheme: '.toast-warm'
          })
        } else if (!response.ok) {
          addNotification({
            headerText: 'Error',
            bodyText: errorMessage,
            imgURL: '/assets/error.jpg',
            variantTheme: 'danger',
            customTheme: '.toast-error'
          })
        }
        setIsLoaded(true)
        return { success: false, error: errorMessage, status: response.status }
      }

      const data = await response.json()
      setIsLoaded(true)
      return { success: true, data }

    } catch (err) {
      addNotification({
        headerText: 'Error',
        bodyText: 'Unable to reach the server.',
        imgURL: '/assets/error.jpg',
        variantTheme: 'danger',
        customTheme: '.toast-error'
      })
      setIsLoaded(true)
      return { success: false, error: 'Network error', status: null }
    }
  }

  return (
    <FetcherContext.Provider value={{ fetcher, isLoaded, setIsLoaded }}>
      {children}
    </FetcherContext.Provider>
  )
}
