import { useState } from "react";
import "./search-for-pet.css";

const items = ["React", "Angular", "Vue", "Svelte", "Next.js", "Remix"];

const SearchForPet = () => {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // track arrow navigation
  const [selected, setSelected] = useState(null); // track selection

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!filtered.length) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          setSelected(filtered[highlightedIndex]);
          setQuery(filtered[highlightedIndex]); // fill input with selection
        }
        break;
      case "Escape":
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleSelect = (item) => {
    setSelected(item);
    setQuery(item);
    setHighlightedIndex(-1);
  };

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
