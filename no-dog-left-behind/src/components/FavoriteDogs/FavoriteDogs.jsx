import './favorite-dogs.css'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'
import AdoptableDogCard from '../AdoptableDogs/AdoptableDogCard'


const FavoriteDogs = () => {
  const { favoriteMatchedDog } = useFavoriteDogs()
  const { dogs } = useDogSearch()

  const matchedDog = dogs.filter((dog) => dog.id === favoriteMatchedDog)[0]
  console.log('Matched: ', matchedDog[0])
  return (
    <>
        <div className="fav-dog-card-heading">
            <h1>Congratulations! We Matched You With {matchedDog.name}!</h1>
        </div>
        <div className="favorite-dog-card">
            <AdoptableDogCard 
                key={matchedDog.id}
                Id={matchedDog.id}
                dogImg={matchedDog.img}
                dogName={matchedDog.name}
                dogAge={matchedDog.age}
                zipOfDog={matchedDog.zip_code}
                dogBreed={matchedDog.breed}
            />
        </div>
    </>
  )
}

export default FavoriteDogs
