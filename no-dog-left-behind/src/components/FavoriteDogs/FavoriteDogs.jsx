import './favorite-dogs.css'
import { useEffect } from 'react'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'
import AdoptableDogCard from '../AdoptableDogs/AdoptableDogCard'

const FavoriteDogs = () => {
  const { favoriteMatchedDog, favoriteDogIds, matchDogFromFavorites } = useFavoriteDogs()
  const { dogs } = useDogSearch()

  useEffect(() => {
    matchDogFromFavorites()
  }, [favoriteDogIds])

  const matchedDog = dogs.find((dog) => String(dog.id) === String(favoriteMatchedDog))

  if (!matchedDog) {
    return (
      <div className="fav-dog-card-heading">
        <h1>No match yet — keep adding favorites!</h1>
      </div>
    )
  }

  return (
    <>
      <div className="fav-dog-card-heading">
        <h1>
          🎉 Congratulations! We Matched You With {matchedDog.name}!
        </h1>
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
