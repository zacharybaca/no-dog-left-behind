import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState, useEffect } from 'react'
import { useNotification } from '../../hooks/useNotification.js'

export const FavoriteDogsProvider = ({ children }) => {
    const [favoriteDogs, setFavoriteDogs] = useState([])
    const [favoritedDog, setFavoritedDog] = useState(false)
    const { addNotification } = useNotification()

    const addFavoriteDog = (favoritedDog) => {
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

            console.log('Favorited')
        } else {
            deleteFavoriteDog(favoritedDog)
            setFavoritedDog(false)
            console.log('Unfavorited')
        }
    }

   const deleteFavoriteDog = (favoritedDog) => {
        setFavoriteDogs((prev) =>
            prev.filter((dog) => dog.id !== favoritedDog.id)
        )
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
            favoritedDog,
            addFavoriteDog,
            deleteFavoriteDog
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
