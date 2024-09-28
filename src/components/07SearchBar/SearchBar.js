// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import any necessary styles

const SearchBar = ({ setSearchResults }) => {
  const [searchInput, setSearchInput] = useState('');

  // Search handler to filter cars
  const handleSearch = async () => {
    if (searchInput.trim() === '') return; // Prevent search if input is empty

    try {
      const response = await axios.get(`http://localhost:6969/cars/search?query=${searchInput}`);
      console.log('Search results:', response.data);
      setSearchResults(response.data.found ? response.data.cars : []); // Set search results
    } catch (error) {
      console.error('Error searching for cars:', error);
    }
  };

  // Handle Enter key for search input
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        id="search-input"
        placeholder="Search cars"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleSearchKeyPress}
      />
      <i className="fas fa-search" onClick={handleSearch}></i>
    </div>
  );
};

export default SearchBar;
