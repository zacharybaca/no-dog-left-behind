import './adoptable-dogs.css'

const AdoptableDogs = ({ dogs, dogIds }) => {
    let dogsForAdoption = dogs.length > 0

    return (
        dogsForAdoption ? dogs.map((dog, id) => {
            <div className="adoptable-dogs-container" key={dog.id}>
                <p>`ID: ${dog.id}`</p>
                <p>`Image of Dog: <img src={dog.img} />`</p>
                <p>`Name of Dog: ${dog.name}`</p>
                <p>`Age of Dog: ${dog.age}`</p>
                <p>`Zip of Dog: ${dog.zip_code}`</p>
                <p>`Breed of Dog: ${dog.breed}`</p>
            </div>
        })
        :   <div className="adoptable-dogs-container">
                <h1>No Adoptable Dogs Available</h1>
            </div>
    )
}

export default AdoptableDogs;
