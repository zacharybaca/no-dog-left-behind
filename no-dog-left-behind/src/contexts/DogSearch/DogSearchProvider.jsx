import { DogSearchContext } from './DogSearchContext'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useFetcher } from '../../hooks/useFetcher'
import { useNotification } from '../../hooks/useNotification'
import { useAuth } from '../../hooks/useAuth'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const dogBreedUrl = import.meta.env.VITE_DOG_BREED_URL
// Need to merge isAuthenticated state with Auth Context
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
  // Boolean to Keep Track if Loading Screen for Fetching Dogs Should Appear or Not
  const [isLoading, setIsLoading] = useState(false)
  const { fetcher } = useFetcher()
  const { addNotification } = useNotification()
  const { isAuthenticated } = useAuth()

  // Track request IDs for stale response protection
  const activeSearchId = useRef(0)
  const activeDetailId = useRef(0)

  const fetchDogs = async (query = '', breed) => {
    setIsLoading(true)
    const thisRequestId = ++activeSearchId.current

    try {
      const res = await fetcher(`${baseUrl}/dogs/search${query}`, { method: 'GET' })

      const data = res.data

      if (query === 'breeds' && breed) {
        const resDogBreed = await fetcher(`${dogBreedUrl}/search?q=terrier`, { method: 'GET' })
        const dogBreedFacts = resDogBreed.data
        setBreedData(dogBreedFacts)
      }

      if (thisRequestId === activeSearchId.current) {
        setDogIds(data && data.resultIds ? data.resultIds : [])
        setNextQuery(data && data.next ? data.next : null)
        setPrevQuery(data && data.prev ? data.prev : null)
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
    console.log('Dog IDs: ', dogIds);
  }

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
