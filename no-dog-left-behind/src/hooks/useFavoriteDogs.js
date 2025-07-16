import { useContext } from 'react'
import { FavoriteDogsContext } from '../contexts/FavoriteDogs/FavoriteDogsContext'

export const useFavoriteDogs = () => useContext(FavoriteDogsContext)
