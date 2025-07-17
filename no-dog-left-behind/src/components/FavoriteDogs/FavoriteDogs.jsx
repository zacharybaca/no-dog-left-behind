import './favorite-dogs.css'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'

const FavoriteDogs = () => {
    const { favoriteDogs, favoritedDog } = useFavoriteDogs()
    const { dogs } = useDogSearch()

    return (
        <div>
            {favoriteDogs.map((dog) => {
                <h1>{dog.name}</h1>
            })}
        </div>
    )
}

export default FavoriteDogs;
