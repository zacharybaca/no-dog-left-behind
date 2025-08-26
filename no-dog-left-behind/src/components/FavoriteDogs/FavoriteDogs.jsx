import './favorite-dogs.css'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'

const FavoriteDogs = () => {
  const { favoriteDogIds } = useFavoriteDogs()
  const { dogs } = useDogSearch()

  return (
    favoriteDogIds.length > 0 ? (
      <div>
        {favoriteDogIds.map((id) => (
          <h1 key={id}>{id}</h1>
        ))}
      </div>
    ) : (
      <h1>No Favorite Dog Generated</h1>
    )
  )
}

export default FavoriteDogs
