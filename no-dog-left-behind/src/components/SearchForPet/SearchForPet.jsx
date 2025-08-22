import { useSearchForPet } from '../../hooks/useSearchForPet'
import "./search-for-pet.css";

const SearchForPet = () => {

  const { query, setQuery, highlightedIndex, setHighlightedIndex, selected, filtered, handleKeyDown, handleSelect } = useSearchForPet()

  return (
    <div className="search-box-container">
      <div className="logo-image-container">
        <img src="/assets/no-dog-left-behind-logo.png" alt="logo image" />
        <h1>Search for Your New Best Friend!</h1>
      </div>
      <br />
      <br />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1); // reset when typing
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="search-input"
      />

      {query && (
        <ul
          className={`results-dropdown ${filtered.length > 0 ? "show" : "show"}`}
        >
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className={`result-item ${highlightedIndex === index ? "highlighted" : ""
                  }`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="no-results">No results</li>
          )}
        </ul>
      )}

      {selected && (
        <div className="selected-message">
          Selected: <strong>{selected}</strong>
        </div>
      )}
    </div>
  );
};

export default SearchForPet;
