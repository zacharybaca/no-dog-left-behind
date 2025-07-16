import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'
import { useState } from 'react'

export const FavoriteDogsProvider = ({ children }) => {
    const [favoriteDogs, setFavoriteDogs] = useState([])

    return (
        <FavoriteDogsContext.Provider value={{
            favoriteDogs
        }}>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
