import './dashboard.css'
import { useDogSearch } from '../../hooks/useDogSearch'
import HeroSection from '../HeroSection/HeroSection'

const Dashboard = () => {
  const { dogIds, dogs, isLoading, fetchDogs, nextQuery, prevQuery, goToNextPage, goToPrevPage } =
    useDogSearch()

  return (
    <div className="dashboard-container">
       <div className="hero-container">
          <HeroSection fetchDogs={fetchDogs} isLoading={isLoading}/>
       </div>
       <div className="pagination-controls">
          <button disabled={!prevQuery} onClick={goToPrevPage}>
            Previous
          </button>
          <button disabled={!nextQuery} onClick={goToNextPage}>
            Next
          </button>
      </div>
    </div>
  )
}

export default Dashboard
