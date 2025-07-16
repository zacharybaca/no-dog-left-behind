import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState, useEffect } from 'react'

export const FavoriteDogsProvider = ({ children }) => {
    const [favoriteDogs, setFavoriteDogs] = useState([])

    const addFavoriteDog = (favoritedDog) => {
        const isFavoriteDogIncluded = favoriteDogs.filter((dog) => dog.id === favoritedDog.id)

        if (!isFavoriteDogIncluded) {
            setFavoriteDogs((prev) => [
                ...prev,
                favoritedDog
            ])
        }
        else {
            throw new Error('Dog Already Exists!')
        }
    }

    useEffect(() => {
        localStorage.setItem('favorite-dogs', JSON.stringify(favoriteDogs))
    }, [favoriteDogs])

    useEffect(() => {
        const stored = localStorage.getItem('favorite-dogs')
        if (stored) {
            try {
                setFavoriteDogs(JSON.parse(stored))
            } catch (e) {
                console.error('Failed to parse favorite dogs from localStorage', e)
            }
        }
    }, [])
    
    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs,
            addFavoriteDog
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
