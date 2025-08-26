import { useContext } from 'react'
import { FavoriteDogsContext } from '../contexts/FavoriteDogs/FavoriteDogsContext'

export const useFavoriteDogs = () => {
  const context = useContext(FavoriteDogsContext)
  if (!context) {
    throw new Error('useFavoriteDogs must be used within a FavoriteDogsProvider')
  }
  return context
}
