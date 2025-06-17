import './dashboard.css';
import { useDogSearch } from '../../hooks/useDogSearch';



const Dashboard = () => {
    const { dogIds, dogs, fetchDogs, nextQuery, prevQuery, goToNextPage, goToPrevPage, isLoading } = useDogSearch();

    console.log('Dogs: ', dogs);

    return (
        <div className="pagination-controls">
            <button disabled={!prevQuery} onClick={goToPrevPage}>Previous</button>
            <button disabled={!nextQuery} onClick={goToNextPage}>Next</button>
        </div>
    )
}

export default Dashboard;
