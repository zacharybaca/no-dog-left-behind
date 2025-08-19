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
    const { addNotification } = useNotification()

    const addFavoriteDog = (dog, event) => {
        event.stopPropagation()

        const isFavoriteDogIncluded = favoriteDogs.some((d) => d.id === dog.id)

        if (!isFavoriteDogIncluded) {
            setFavoriteDogs((prev) => [...prev, dog])
            addNotification({
                headerText: 'Info',
                bodyText: 'You Added a New Favorite Dog to Your List!',
                imgURL: '/assets/success.png',
                variantTheme: 'success',
                customTheme: '.toast-success',
            })
        } else {
            deleteFavoriteDog(dog)
            console.log('Unfavorited')
        }
    }

    const isAFavoriteDog = (id) => {
        return favoriteDogs.some((dog) => dog.id === String(id) || dog.id === id)
    }

    const deleteFavoriteDog = (dog) => {
        setFavoriteDogs((prev) =>
            prev.filter((d) => d.id !== dog.id)
        )
    }

    useEffect(() => {
        localStorage.setItem('favorite-dogs', JSON.stringify(favoriteDogs))
    }, [favoriteDogs])

    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs,
            isAFavoriteDog,
            addFavoriteDog,
            deleteFavoriteDog
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
