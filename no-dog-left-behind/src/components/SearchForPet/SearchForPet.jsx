import { useState } from "react";
import './search-for-pet.css';

const items = ["React", "Angular", "Vue", "Svelte", "Next.js", "Remix"];

const SearchForPet = () => {
  const [query, setQuery] = useState("");

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-64 mx-auto">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 w-full rounded"
      />
      {query && (
        <ul className="border mt-1 rounded bg-white shadow">
          {filtered.length > 0 ? (
            filtered.map(item => (
              <li
                key={item}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchForPet;
