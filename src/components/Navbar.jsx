import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "./Navbar.css";
import useWindowSize from "./utils/useWindowSize"; // Import the useWindowSize hook

const Navbar = () => {
  const windowSize = useWindowSize(); // Use the useWindowSize hook

  // Check if window width is less than or equal to 768px
  const isMobile = windowSize.width <= 768;

  // State to manage mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className='nav'>
      <Link to="/" className="logo">
        AutoVoyage
      </Link>

      {/* Render menu button for mobile */}
      {isMobile && (
        <button className="menu-btn" onClick={toggleMobileMenu}>&#9776;</button>
      )}

      {/* Render nav links based on window size */}
      <ul className={`nav-links ${isMobile ? 'mobile' : ''} ${mobileMenuOpen ? 'show' : ''}`}>
        <li className="dropdown">
          <a href="#" className="dropbtn">New</a>
          <div className="dropdown-content">
            <a href="Nav-Bar Categories\01.New\01.Deals\13deals.html">Deals</a>
            <a href="Nav-Bar Categories\01.New\02.New Car Listings\16new-car-listings.html">New Car Listings</a>
            <a href="#">New SUVs</a>
            <a href="#">New Trucks</a>
            <a href="#">New Vans</a>
            <a href="#">New Convertibles</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Used</a>
          <div className="dropdown-content">
            <a href="#">Used Car Listings</a>
            <a href="#">Used EVs</a>
            <a href="#">Used SUVs</a>
            <a href="#">Used Trucks</a>
            <a href="#">Used Vans</a>
            <a href="#">Used Convertibles</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Electric</a>
          <div className="dropdown-content">
            <a href="#">EV Hub</a>
            <a href="#">New EVs</a>
            <a href="#">EV Incentives</a>
            <a href="#">EV Deals</a>
            <a href="#">Buyers Guide</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Research</a>
          <div className="dropdown-content">
            <a href="#">Car Reviews</a>
            <a href="#">Car Rankings</a>
            <a href="#">Compare Cars</a>
            <a href="#">Car Finder Quiz</a>
            <a href="#">Lease a Car</a>
            <a href="#">Electric Vehicles</a>
            <a href="#">Research Center</a>
          </div>
        </li>
        <li><a href="#">Sell Your Car</a></li>
      </ul>

      <div className="search-box">
              <input type="text" id="search-input" placeholder="Search cars" />
        <i className="fas fa-search"></i>
        <div className="suggestions-box" id="suggestions-box"></div>
      </div>

      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div className="profile-icon">
       <a href="10profile.html"><i className="fas fa-user-circle"></i></a>
      </div>
    </nav>
  );
};

export default Navbar;

