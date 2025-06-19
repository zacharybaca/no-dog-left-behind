import { DogSearchContext } from './DogSearchContext'
import { useState, useEffect } from 'react'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const DogSearchProvider = ({ children }) => {
  const [dogIds, setDogIds] = useState([])
  const [dogs, setDogs] = useState([])
  const [nextQuery, setNextQuery] = useState(null)
  const [prevQuery, setPrevQuery] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDogs = async (query = '') => {
    setIsLoading(true)
    try {
      const response = await fetch(`${baseUrl}/dogs/search${query}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
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
        const response = await fetch(`${baseUrl}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: dogIds }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

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
        isLoading,
      }}
    >
      {children}
    </DogSearchContext.Provider>
  )
}
