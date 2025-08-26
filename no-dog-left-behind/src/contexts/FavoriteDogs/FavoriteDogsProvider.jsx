import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState, useEffect } from 'react'
import { useNotification } from '../../hooks/useNotification.js'
import { useFetcher } from '../../hooks/useFetcher.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL

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

    const [favoriteDogIds, setFavoriteDogIds] = useState(() => {
        try {
            const stored = localStorage.getItem('favorite-dogs-ids')
            return stored ? JSON.parse(stored) : []
        } catch (e) {
            console.error('Failed to load favorite dog ids from localStorage', e)
            return []
        }
    })

    const { addNotification } = useNotification()
    const { fetcher } = useFetcher()

    const addFavoriteDog = (dog, event) => {
        event.stopPropagation()

        const isFavoriteDogIncluded = favoriteDogs.some((d) => d.id === dog.id)
        
        if (!isFavoriteDogIncluded) {
            setFavoriteDogs((prev) => [...prev, dog])
            setFavoriteDogIds(prev => [...prev, dog.id])
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
    console.log('Fav Dogs: ', favoriteDogIds)
    const isAFavoriteDog = (id) => {
        return favoriteDogs.some((dog) => dog.id === String(id) || dog.id === id)
    }

    const deleteFavoriteDog = (dog) => {
        setFavoriteDogs((prev) =>
            prev.filter((d) => d.id !== dog.id)
        )

        setFavoriteDogIds((prev) => prev.filter((id) => id !== dog.id))
    }

    const matchDogFromFavorites = async () => {
        const res = await fetcher(`${baseUrl}/dogs/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favoriteDogIds)
        })

        if (!res.success) {
            return {
                status: 'Error',
                message: res.error || 'Unknown error'
            }
        }

        const data = res.data
        console.log('Data From Fav Dog: ', data.match)
    }

    useEffect(() => {
        localStorage.setItem('favorite-dogs', JSON.stringify(favoriteDogs))
        localStorage.setItem('favorite-dogs-ids', JSON.stringify(favoriteDogIds))
    }, [favoriteDogs])

    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs,
            favoriteDogIds,
            isAFavoriteDog,
            addFavoriteDog,
            deleteFavoriteDog,
            matchDogFromFavorites
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
