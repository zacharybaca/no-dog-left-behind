import './adoptable-dogs.css'
import AdoptableDogCard from './AdoptableDogCard.jsx'

const AdoptableDogs = ({ dogs }) => {
    const dogsForAdoption = dogs.length > 0
    console.log('Dogs For Adoption: ', dogsForAdoption)

    return (
        <div className='dogs-container'>
            {dogsForAdoption ? (
                dogs.map((dog) => (
                    <AdoptableDogCard
                        key={dog.id}
                        Id={dog.id}
                        dogImg={dog.img}
                        dogName={dog.name}
                        dogAge={dog.age}
                        zipOfDog={dog.zip_code}
                        dogBreed={dog.breed}
                        dog={{
                            id: `${dog.id}`,
                            img: `${dog.img}`,
                            name: `${dog.name}`,
                            age: `${dog.age}`,
                            zip_code: `${dog.zip_code}`,
                            breed: `${dog.breed}`
                        }}
                    />
                ))
            ) : (
                <div className="adoptable-dogs-text-container">
                    <h1>No Adoptable Dogs Available</h1>
                </div>
            )}
        </div>
    )
}

export default AdoptableDogs
