import './dashboard.css'
import { useDogSearch } from '../../hooks/useDogSearch'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../HeroSection/HeroSection'
import AdoptableDogs from '../AdoptableDogs/AdoptableDogs'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {
  const { dogIds, dogs, isLoading, fetchDogs, nextQuery, prevQuery, goToNextPage, goToPrevPage, toggleBreed } =
    useDogSearch()

  const navigate = useNavigate()

  const handleDetailsClick = (navigateComponentURL) => {
    navigate(`/${navigateComponentURL}`)
  }

  return (
    <div className="dashboard-container">
        {dogs.length === 0 && (
          <div className="hero-container">
            <HeroSection fetchDogs={fetchDogs} isLoading={isLoading}/>
          </div>
        )}
        {dogs.length !== 0 && (
           <>
            <div className="adoptable-dogs-wrapper">
              <div className="catelog-title-container">
                <h1>Discover Your New Best Friend!</h1>
                <Button type="button" onClick={toggleBreed}>Toggle Asc/Desc List of Breeds</Button>
              </div>
              <div className="adoptable-dog-list-container">
                <AdoptableDogs dogs={dogs} dogIds={dogIds} />
              </div>
            </div>
            <div className="pagination-controls">
              <button type="button" disabled={!prevQuery} onClick={goToPrevPage}>
                Previous
              </button>
              <button type="button" disabled={!nextQuery} onClick={goToNextPage}>
                Next
              </button>
              <button type="button" onClick={() => handleDetailsClick('dog-details')}>
                Get More Information
              </button>
            </div></>
          )}
      </div>
  )
}

export default Dashboard
