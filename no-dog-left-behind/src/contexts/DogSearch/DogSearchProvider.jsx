import { DogSearchContext } from './DogSearchContext'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useFetcher } from '../../hooks/useFetcher'
import { useNotification } from '../../hooks/useNotification'
import { useAuth } from '../../hooks/useAuth'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const dogBreedUrl = import.meta.env.VITE_DOG_BREED_URL
const dogBreedApiKey = import.meta.env.VITE_DOG_API_KEY

export const DogSearchProvider = ({ children }) => {
  const [dogIds, setDogIds] = useState([])
  const [dogs, setDogs] = useState([{
    id: '1',
    img: 'https://placedog.net/213/180',
    name: 'Sunny',
    age: '20',
    zip_code: '46350',
    breed: 'Chi'
  }])
  const [breedData, setBreedData] = useState("")
  const [nextQuery, setNextQuery] = useState(null)
  const [prevQuery, setPrevQuery] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { fetcher } = useFetcher()
  const { addNotification } = useNotification()
  const { isAuthenticated } = useAuth()

  const activeSearchId = useRef(0)
  const activeDetailId = useRef(0)

  // Fetch paginated dogs from the API
  const fetchDogs = async (query = '') => {
    setIsLoading(true)
    const thisRequestId = ++activeSearchId.current

    try {
      const data = await fetcher(`${baseUrl}/dogs/search${query}`, { method: 'GET' })

      if (thisRequestId === activeSearchId.current) {
        setDogIds(data?.resultIds ?? [])
        setNextQuery(data?.next ?? null)
        setPrevQuery(data?.prev ?? null)
      }
    } catch (err) {
      if (thisRequestId === activeSearchId.current) {
        addNotification({
          headerText: 'Error',
          bodyText: err.message,
          imgURL: '/assets/error.jpg',
          variantTheme: 'danger',
          customTheme: '.toast-warm'
        })
        console.error('❌ fetchDogs error:', err.message)
      }
    } finally {
      if (thisRequestId === activeSearchId.current) {
        setIsLoading(false)
      }
    }
  }

  // Separate function to fetch breed info
  const fetchBreedData = async (breed) => {
    if (!breed) return

    try {
      const data = await fetcher(`${dogBreedUrl}/search?q=${breed}`, { method: 'GET', headers: { 'x-api-key': dogBreedApiKey } })
      setBreedData(data)
    } catch (err) {
      console.error('❌ fetchBreedData error:', err.message)
    }
  }

  // Fetch full dog details by ID list
  useEffect(() => {
    if (dogIds.length === 0) return

    const thisRequestId = ++activeDetailId.current

    const fetchDogDetails = async () => {
      try {
        const data = await fetcher(`${baseUrl}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: dogIds }),
        })

        if (thisRequestId === activeDetailId.current) {
          setDogs(data)
        }
      } catch (err) {
        if (thisRequestId === activeDetailId.current) {
          console.error('❌ fetchDogDetails error:', err.message)
        }
      }
    }

    fetchDogDetails()
  }, [dogIds])

  // Initial fetch when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDogs()
    }
  }, [isAuthenticated])

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
    fetchBreedData,
    breedData,
    nextQuery,
    prevQuery,
    goToNextPage,
    goToPrevPage,
    isLoading,
  }), [
    dogIds,
    dogs,
    breedData,
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
