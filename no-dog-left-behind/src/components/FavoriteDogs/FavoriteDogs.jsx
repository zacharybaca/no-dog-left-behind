import './favorite-dogs.css'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'

const FavoriteDogs = () => {
  const { favoriteDogIds, favoriteMatchedDog } = useFavoriteDogs()
  const { dogs } = useDogSearch()

  return (
   <div>
    <h1>{favoriteMatchedDog}</h1>
   </div>
  )
}

export default FavoriteDogs
