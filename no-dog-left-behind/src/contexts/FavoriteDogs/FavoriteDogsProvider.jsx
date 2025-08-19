import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState, useEffect } from 'react'
import { useNotification } from '../../hooks/useNotification.js'

export const FavoriteDogsProvider = ({ children }) => {
    const [favoriteDogs, setFavoriteDogs] = useState(() => {
        try {
            const stored = localStorage.getItem('favorite-dogs')
            return stored ? JSON.parse(stored) : []
        } catch (e) {
            console.error('Failed to load favorite dogs from localStorage', e)
            return []
        }
    })
    const [favoritedDog, setFavoritedDog] = useState(false)
    const { addNotification } = useNotification()

    const addFavoriteDog = (favoritedDog, event) => {
         event.stopPropagation()
         
        const isFavoriteDogIncluded = favoriteDogs.some((dog) => dog.id === favoritedDog.id)

        if (!isFavoriteDogIncluded) {
            setFavoriteDogs((prev) => [...prev, favoritedDog])
            setFavoritedDog(true)
            addNotification({
                headerText: 'Info',
                bodyText: 'You Added a New Favorite Dog to Your List!',
                imgURL: '/assets/success.png',
                variantTheme: 'success',
                customTheme: '.toast-success',
            })
        } else {
            deleteFavoriteDog(favoritedDog)
            setFavoritedDog(false)
            console.log('Unfavorited')
        }
    }

    const isAFavoriteDog = (id) => {
        const isFavorite = favoriteDogs.some((dog) => dog.id === String(id))
        return isFavorite
    }

    const deleteFavoriteDog = (favoritedDog) => {
        setFavoriteDogs((prev) =>
            prev.filter((dog) => dog.id !== favoritedDog.id)
        )
    }

    // Save favorites to localStorage when they change
    useEffect(() => {
        localStorage.setItem('favorite-dogs', JSON.stringify(favoriteDogs))
    }, [favoriteDogs])

    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs,
            favoritedDog,
            isAFavoriteDog,
            addFavoriteDog,
            deleteFavoriteDog
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
