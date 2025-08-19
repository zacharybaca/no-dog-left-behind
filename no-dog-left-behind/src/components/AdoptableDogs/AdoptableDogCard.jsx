import './adoptable-dog-card.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFavoriteDogs } from '../../hooks/useFavoriteDogs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const AdoptableDogCard = ({ Id, dogImg, dogName, dogAge, zipOfDog, dogBreed, dog }) => {
  const { addFavoriteDog, isAFavoriteDog } = useFavoriteDogs()
  const aFavoriteDog = isAFavoriteDog(Id)

  const handleFavoriteClick = (dog, e) => {
    addFavoriteDog(dog, e)   // ⚠ remember addFavoriteDog expects event too
  }

  return (
    <div className="card-wrapper" key={Id}>
      <Card id="custom-dog-card">
        <Card.Img className="card-image" variant="top" src={dogImg} />
        <Card.Body>
          <div className="dog-name-title">
            <Card.Title className="dog-name">Meet {dogName}</Card.Title>
          </div>
          <hr />
          <Card.Text>
            Age of Dog: {dogAge}<br />
            ZipCode of Dog: {zipOfDog}<br />
            Breed of Dog: {dogBreed}
          </Card.Text>
          <div className="card-button-container">
            <Button
              variant="primary"
              className="favorite-button"
              onClick={(e) => handleFavoriteClick(dog, e)}
            >
              {aFavoriteDog 
                ? <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#f60940" }} /> 
                : <FontAwesomeIcon icon={faRegularHeart} size="lg" style={{ color: '#f60940' }} />}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdoptableDogCard;
