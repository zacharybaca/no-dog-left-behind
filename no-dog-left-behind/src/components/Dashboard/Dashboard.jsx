import './dashboard.css';
import { useDogSearch } from '../../hooks/useDogSearch';



const Dashboard = () => {
    const { dogIds, dogs, nextQuery, prevQuery, isLoading } = useDogSearch();


    return (
        <div className="pagination-controls">
            <button disabled={!prevQuery} onClick={() => fetchDogs(prevQuery)}>Previous</button>
            <button disabled={!nextQuery} onClick={() => fetchDogs(nextQuery)}>Next</button>
        </div>
    )
}

export default Dashboard;
