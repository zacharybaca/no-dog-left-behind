import './adoptable-dog-card.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const AdoptableDogCard = ({ Id, dogImg, dogName, dogAge, zipOfDog, dogBreed }) => {
  return (
    <Card id="custom-dog-card">
      <Card.Img className="card-image" variant="top" src={dogImg} />
      <hr />
      <Card.Body>
        <div className="dog-name-title">
          <Card.Title className="dog-name">Meet {dogName}</Card.Title>
        </div>
        <Card.Text>
          Dog ID: {Id}<br />
          Age of Dog: {dogAge}<br />
          ZipCode of Dog: {zipOfDog}<br />
          Breed of Dog: {dogBreed}
        </Card.Text>
        <div className="card-button-container">
          <Button variant="primary" className="favorite-button">
            <FontAwesomeIcon icon={faHeart} style={{ color: "#f60940" }} />
            <FontAwesomeIcon icon={faRegularHeart} style={{ color: '#f60940' }} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdoptableDogCard;
