import { DogSearchContext } from './DogSearchContext'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useFetcher } from '../../hooks/useFetcher'
import { useNotification } from '../../hooks/useNotification'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const DogSearchProvider = ({ children }) => {
  const [dogIds, setDogIds] = useState([])
  const [dogs, setDogs] = useState([])
  const [nextQuery, setNextQuery] = useState(null)
  const [prevQuery, setPrevQuery] = useState(null)
  // Boolean to Keep Track if Loading Screen for Fetching Dogs Should Appear or Not
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const { fetcher } = useFetcher()
  const { addNotification } = useNotification()

  // Track request IDs for stale response protection
  const activeSearchId = useRef(0)
  const activeDetailId = useRef(0)

  const fetchDogs = async (query = '') => {
    setIsLoading(true)
    const thisRequestId = ++activeSearchId.current

    try {
      const res = await fetcher(`${baseUrl}/dogs/search${query}`, { method: 'GET' })

      const data = res.data

      if (thisRequestId === activeSearchId.current) {
        setDogIds(data && data.resultIds ? data.resultIds : [])
        setNextQuery(data && data.next ? data.next : null)
        setPrevQuery(data && data.prev ? data.prev : null)
      }
    } catch (err) {
      if (thisRequestId === activeSearchId.current) {
         addNotification('Error', err.message, '/assets/error.jpg', 'danger', '.toast-warm')
        console.error('❌ fetchDogs error:', err.message)
      }
    } finally {
      if (thisRequestId === activeSearchId.current) {
        setIsLoading(false)
      }
    }
    console.log('Dog IDs: ', dogIds);
  }

  const checkAuth = async () => {
    try {
      const res = await fetcher(`${baseUrl}/dogs/breeds`, { method: 'GET' })

      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (err) {
      console.error('❌ checkAuth error:', err)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchDogs()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (dogIds.length === 0) return

    const thisRequestId = ++activeDetailId.current

    const fetchDogDetails = async () => {
      try {
        const res = await fetcher(`${baseUrl}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: dogIds }),
        })

        if (!res.ok) {
          throw new Error(`Details failed with status ${res.status}`)
        }

        const data = await res.json()

        if (thisRequestId === activeDetailId.current) {
          setDogs(data)
        }
      } catch (err) {
        if (thisRequestId === activeDetailId.current) {
          console.error('❌ fetchDogDetails error:', err)
        }
      }
    }

    fetchDogDetails()
  }, [dogIds, fetcher])

  const goToNextPage = () => {
    if (nextQuery) {
      fetchDogs(nextQuery)
    }
  }

  const goToPrevPage = () => {
    if (prevQuery) {
      fetchDogs(prevQuery)
    }
  }

  const value = useMemo(() => ({
    dogIds,
    dogs,
    fetchDogs,
    nextQuery,
    prevQuery,
    goToNextPage,
    goToPrevPage,
    isLoading,
  }), [
    dogIds,
    dogs,
    nextQuery,
    prevQuery,
    isLoading,
  ])

  return (
    <DogSearchContext.Provider value={value}>
      {children}
    </DogSearchContext.Provider>
  )
}
