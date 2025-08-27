import { SearchForPetContext } from './SearchForPetContext'
import { useState, useEffect } from 'react';
import { useDogSearch } from '../../hooks/useDogSearch'

export const SearchForPetProvider = ({ children }) => {
  const { breedData, fetchDogs } = useDogSearch()
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selected, setSelected] = useState([]);

  const breeds = breedData?.data || [];

  const filtered = breeds.filter((breed) =>
    breed.toLowerCase().includes(query.toLowerCase())
  );

  console.log('Breeds: ', breeds);

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
          const breed = filtered[highlightedIndex];
          setSelected((prev) =>
            prev.includes(breed) ? prev : [...prev, breed]
          );
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
    setSelected((prev) =>
      prev.includes(item) ? prev : [...prev, item]
    );
    setQuery("");
    setHighlightedIndex(-1);
  };

  const removeSelected = (item) => {
    setSelected((prev) => prev.filter((breed) => breed !== item));
  };

  useEffect(() => {
    if (selected.length > 0) {
      fetchDogs(`/dogs/search?${selected.map(breed => `breeds=${encodeURIComponent(breed)}`).join("&")}`)
    }
    else {
      fetchDogs()
    }
  }, [selected]);

  return (
    <SearchForPetContext.Provider
      value={{
        query,
        setQuery,
        highlightedIndex,
        setHighlightedIndex,
        selected,
        setSelected,
        filtered,
        handleKeyDown,
        handleSelect,
        removeSelected
      }}
    >
      {children}
    </SearchForPetContext.Provider>
  )
}
