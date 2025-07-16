import './adoptable-dog-card.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AdoptableDogCard = ({ Id, dogImg, dogName, dogAge, zipOfDog, dogBreed }) => {
  return (
    <Card id="custom-dog-card">
      <Card.Img variant="top" src={dogImg} />
      <Card.Body>
        <Card.Title className="dog-name">Meet {dogName}</Card.Title>
        <Card.Text>
          Dog ID: {Id}<br />
          Age of Dog: {dogAge}<br />
          ZipCode of Dog: {zipOfDog}<br />
          Breed of Dog: {dogBreed}
        </Card.Text>
        <Button variant="primary">Add to Favorites</Button>
      </Card.Body>
    </Card>
  )
}

export default AdoptableDogCard;
