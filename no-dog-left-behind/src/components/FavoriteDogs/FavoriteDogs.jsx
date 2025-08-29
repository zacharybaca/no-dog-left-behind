// import './favorite-dogs.css'
// import { useEffect } from 'react'
// import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
// import { useDogSearch } from '../../hooks/useDogSearch'
// import AdoptableDogCard from '../AdoptableDogs/AdoptableDogCard'

// const FavoriteDogs = () => {
//   const { favoriteMatchedDog, favoriteDogIds, matchDogFromFavorites } = useFavoriteDogs()
//   const { dogs } = useDogSearch()

//   useEffect(() => {
//     matchDogFromFavorites()
//   }, [favoriteDogIds, favoriteMatchedDog])

//   const matchedDog = dogs.find((dog) => String(dog.id) === String(favoriteMatchedDog))

//   if (!matchedDog) {
//     return (
//       <div className="fav-dog-card-heading">
//         <h1>No match yet — keep adding favorites!</h1>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="fav-dog-card-heading">
//         <h1>
//           🎉 Congratulations! We Matched You With {matchedDog.name}!
//         </h1>
//       </div>
//       <div className="favorite-dog-card">
//         <AdoptableDogCard
//           key={matchedDog.id}
//           Id={matchedDog.id}
//           dogImg={matchedDog.img}
//           dogName={matchedDog.name}
//           dogAge={matchedDog.age}
//           zipOfDog={matchedDog.zip_code}
//           dogBreed={matchedDog.breed}
//         />
//       </div>
//     </>
//   )
// }

// export default FavoriteDogs

import './favorite-dogs.css'
import { useEffect, useState } from 'react'
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { useDogSearch } from '../../hooks/useDogSearch'
import AdoptableDogCard from '../AdoptableDogs/AdoptableDogCard'

const FavoriteDogs = () => {
  const { favoriteMatchedDog, favoriteDogIds, matchDogFromFavorites } = useFavoriteDogs()
  const { fetchDogsByIds } = useDogSearch()
  const [matchedDog, setMatchedDog] = useState(null)

  // Trigger the match when favorites change
  useEffect(() => {
    matchDogFromFavorites()
  }, [favoriteDogIds])

  // Fetch the matched dog's details
  useEffect(() => {
    if (!favoriteMatchedDog) return

    const loadDog = async () => {
      const dogs = await fetchDogsByIds([favoriteMatchedDog])
      setMatchedDog(dogs[0] || null)
    }

    loadDog()
  }, [favoriteMatchedDog, fetchDogsByIds])

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
        <h1>🎉 Congratulations! We Matched You With {matchedDog.name}!</h1>
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

