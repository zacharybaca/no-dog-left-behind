import { DogSearchContext } from './DogSearchContext'
import { useState, useEffect } from 'react'
import { useFetcher } from '../../hooks/useFetcher'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const DogSearchProvider = ({ children }) => {
  const [dogIds, setDogIds] = useState([])
  const [dogs, setDogs] = useState([])
  const [nextQuery, setNextQuery] = useState(null)
  const [prevQuery, setPrevQuery] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { fetcher } = useFetcher()

  const fetchDogs = async (query = '') => {
    setIsLoading(true)
    try {
      const res = await fetcher(`${baseUrl}/dogs/search${query}`, {
        method: 'GET',
      });

      const data = await response.json()
      setDogIds(data.resultIds || [])
      setNextQuery(data.next || null)
      setPrevQuery(data.prev || null)
    } catch (err) {
      console.error('❌ fetchDogs error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  useEffect(() => {
    if (dogIds.length === 0) return

    const fetchDogDetails = async () => {
      try {
        const res = await fetcher(`${baseUrl}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: dogIds }),
        });

        const data = await response.json()
        setDogs(data)
      } catch (err) {
        console.error('❌ fetchDogDetails error:', err)
      }
    }

    fetchDogDetails()
  }, [dogIds])

  const goToNextPage = () => {
    if (nextQuery) fetchDogs(nextQuery)
  }
  const goToPrevPage = () => {
    if (prevQuery) fetchDogs(prevQuery)
  }

  return (
    <DogSearchContext.Provider
      value={{
        dogIds,
        dogs,
        fetchDogs,
        nextQuery,
        prevQuery,
        goToNextPage,
        goToPrevPage,
        isLoading
      }}
    >
      {children}
    </DogSearchContext.Provider>
  )
}
