import { SearchForPetContext } from './SearchForPetContext'
import { useState, useEffect } from 'react';
import { useDogSearch } from '../../hooks/useDogSearch'


export const SearchForPetProvider = ({ children }) => {
  const { breedData, fetchDogs } = useDogSearch()
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // track arrow navigation
  const [selected, setSelected] = useState(null); // track selection

  const breeds = breedData.data

  const filtered = breeds ? breeds.filter((breed) =>
    breed.toLowerCase().includes(query.toLowerCase())
  ) : "";

  console.log('Breeds: ', breedData.data)

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

  useEffect(() => {
    if (selected) {
      fetchDogs(`/dogs/search?breeds=${selected}`)
    }
  }, [selected])

    return (
        <SearchForPetContext.Provider value={{
            query,
            setQuery,
            highlightedIndex,
            setHighlightedIndex,
            selected,
            setSelected,
            filtered,
            handleKeyDown,
            handleSelect
        }}>
            {children}
        </SearchForPetContext.Provider>
    )
}
