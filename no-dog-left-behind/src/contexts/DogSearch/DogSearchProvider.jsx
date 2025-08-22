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
  const [breedData, setBreedData] = useState([])
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
    let url

    if (!query) {
      // first fetch
      url = `${baseUrl}/dogs/search`
    } else if (query.startsWith('/dogs')) {
      // API already gave us the full path
      url = `${baseUrl}${query}`
    } else {
      // query is just "?size=25&from=25"
      url = `${baseUrl}/dogs/search${query}`
    }

    const data = await fetcher(url, { method: 'GET' })

    if (thisRequestId === activeSearchId.current) {
      setDogIds(data?.data?.resultIds ?? [])
      setNextQuery(data?.data?.next ?? null)
      setPrevQuery(data?.data?.prev ?? null)

      console.log('✅ Updated pagination:', {
        next: data?.data?.next,
        prev: data?.data?.prev,
        resultIds: data?.data?.resultIds
      })
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

 const fetchBreedData = async () => {
  try {
    const data = await fetcher(`${baseUrl}/dogs/breeds`, { method: 'GET' })
    setBreedData(data)
    console.log('Breed Data: ', data) // ✅ log the fresh data, not stale state
  } catch (err) {
    console.error('❌ fetchBreedData error:', err.message)
  }
}

  // Fetch full dog details by ID list
  // Need to Set Dogs from Data instead of hard-coded data
  useEffect(() => {
    if (dogIds.length === 0) return

    const thisRequestId = ++activeDetailId.current

    const fetchDogDetails = async () => {
      try {
        const data = await fetcher(`${baseUrl}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dogIds),
        })
        console.log('Fetched Dog Data: ', data['data'])
        if (thisRequestId === activeDetailId.current) {
          setDogs(data['data'])
          console.log('Dog Details: ', dogs)
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
      fetchBreedData()
    }
  }, [isAuthenticated])

  const goToNextPage = () => {
    if (nextQuery) {
      fetchDogs(nextQuery)
      console.log('Next Q: ', nextQuery)
    }
  }

  const goToPrevPage = () => {
    if (prevQuery) {
      fetchDogs(prevQuery)
      console.log('Prev Q: ', prevQuery)
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
