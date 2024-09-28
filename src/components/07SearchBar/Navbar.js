// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ setSearchResults }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {/* Other links */}
      
      {/* Search Bar */}
      <SearchBar setSearchResults={setSearchResults} />
    </nav>
  );
};

export default Navbar;
