import './adoptable-dogs.css'
import AdoptableDogCard from './AdoptableDogCard.jsx'

const AdoptableDogs = ({ dogs }) => {
    let dogsForAdoption = dogs.length > 0
    console.log('Dogs For Adoption: ', dogsForAdoption)

    return (
        dogsForAdoption ? dogs.map((dog) => (
            <AdoptableDogCard
                key={dog.id}
                Id={dog.id}
                dogImg={dog.img}
                dogName={dog.name}
                dogAge={dog.age}
                zipOfDog={dog.zip_code}
                dogBreed={dog.breed}
            />
        ))
        :   <div className="adoptable-dogs-text-container">
                <h1>No Adoptable Dogs Available</h1>
            </div>
    )
}

export default AdoptableDogs;
