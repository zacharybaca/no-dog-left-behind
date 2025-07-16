import { FavoriteDogsContext } from './FavoriteDogsContext.jsx'

export const FavoriteDogsProvider = ({ children }) => {

    return (
        <FavoriteDogsContext.Provider>
            {children}
        </FavoriteDogsContext.Provider>
    )
}
