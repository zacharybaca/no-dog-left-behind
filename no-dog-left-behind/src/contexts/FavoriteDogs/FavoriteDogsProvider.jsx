import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState } from 'react'

export const FavoriteDogsProvider = ({ children }) => {
    const [favoriteDogs, setFavoriteDogs] = useState([])

    const addFavoriteDog = (favoritedDog) => {
        const isFavoriteDogIncluded = favoriteDogs.filter((dog) => dog._id === favoritedDog._id)

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

    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs,
            addFavoriteDog
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
