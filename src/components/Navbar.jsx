import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../backend/AuthStuff/AuthContext.jsx';
import './Navbar.css';
import axios from 'axios';

const url = "http://localhost:6969/auth/logout";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    axios.post(url, {})
      .then(res => {
        logout();
        console.log(res);
        navigate('/');
      })
      .catch(e => {
        logout();
        console.log(e);
        alert("Failed to logout");
      });
  };

  const handleSearch = async () => {
    if (searchInput.trim() === "") return; // Prevent search if input is empty
    try {
      const response = await axios.get(`http://localhost:6969/cars/search?query=${searchInput}`);
      const searchResults = response.data.found ? response.data.cars : [];
      // Pass search results or search input to HomePage via URL
      navigate(`/home?query=${searchInput}`, { state: { searchResults } });
    } catch (error) {
      console.error("Error searching for cars:", error);
    }
  };
  
const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
};


  return (
    <nav className='nav'>
      <button className='menu-btn' onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </button>

      <Link to="/" className="logo" >
        AutoVoyage
      </Link>

      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li className="dropdown">
          <a href="#" className="dropbtn">New</a>
          <div className="dropdown-content">
            <Link to="/deals" className="dropbtn" onClick={toggleMenu}>Deals</Link>
            <Link to="/new-car-listings" className="dropbtn" onClick={toggleMenu}>New Car Listings</Link>
            <Link to="/new-convertibles" className="dropbtn" onClick={toggleMenu}>New Convertibles</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Used</a>
          <div className="dropdown-content">
            <Link to="/used-car-listings" className="dropbtn" onClick={toggleMenu}>Used Car Listings</Link>
            <Link to="/used-evs" className="dropbtn" onClick={toggleMenu}>Used EVs</Link>
            <Link to="/used-suvs" className="dropbtn" onClick={toggleMenu}>Used SUVs</Link>
            <Link to="/used-trucks" className="dropbtn" onClick={toggleMenu}>Used Trucks</Link>
            <Link to="/used-vans" className="dropbtn" onClick={toggleMenu}>Used Vans</Link>
            <Link to="/used-convertibles" className="dropbtn" onClick={toggleMenu}>Used Convertibles</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Electric</a>
          <div className="dropdown-content">
            <Link to="/ev-hub" className="dropbtn" onClick={toggleMenu}>EV Hub</Link>
            <Link to="/new-evs" className="dropbtn" onClick={toggleMenu}>New EVs</Link>
            <Link to="/ev-incentives" className="dropbtn" onClick={toggleMenu}>EV Incentives</Link>
            <Link to="/ev-deals" className="dropbtn" onClick={toggleMenu}>EV Deals</Link>
            <Link to="/buyers-guide" className="dropbtn" onClick={toggleMenu}>Buyers Guide</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Research</a>
          <div className="dropdown-content">
            <Link to="/car-reviews" className="dropbtn" onClick={toggleMenu}>Car Reviews</Link>
            <Link to="/car-rankings" className="dropbtn" onClick={toggleMenu}>Car Rankings</Link>
            <Link to="/compare-cars" className="dropbtn" onClick={toggleMenu}>Compare Cars</Link>
            <Link to="/car-finder-quiz" className="dropbtn" onClick={toggleMenu}>Car Finder Quiz</Link>
          </div>
        </li>
        <li><Link to="/sell-your-car" className="dropbtn" onClick={toggleMenu}>Sell Your Car</Link></li>
      </ul>

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
        <div className="suggestions-box" id="suggestions-box">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((car, index) => (
                <li key={index}>
                  <p>{car.carBrand} {car.carModel}</p>
                  {/* You can display other car details here */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="auth-links">
        {isAuthenticated ? (
          <>
            <ul className="nav-links">
              <li className="dropdown">
                <a href="#" className="dropbtn">
                  <img src="p.png" alt="Profile Icon" className="profile-img" />
                </a>
                <div className="dropdown-content">
                  <Link to="/profile">View Profile</Link>
                  <Link to="/cart">Cart</Link>
                  <button className="dropdown-logout-btn" onClick={handleLogout}>Log Out</button>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
