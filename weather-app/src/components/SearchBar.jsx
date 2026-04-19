import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <button
        onClick={handleSearch}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;