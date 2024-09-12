<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useAuth } from '../../backend/AuthStuff/AuthContext.jsx'; // Import useAuth
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  
=======
import { Link } from 'react-router-dom'; // Import Link
import "./Navbar.css"

const Navbar = () => {
>>>>>>> 2aa5575cbc578acdd56b3ec28a41a4dc564fdb1f
  return (
    <nav className='nav'>
      <Link to="/" className="logo">
        AutoVoyage
      </Link>
      
      <ul className="nav-links">
        <li className="dropdown">
          <a href="#" className="dropbtn">New</a>
          <div className="dropdown-content">
            <Link to="/deals">Deals</Link>
            <Link to="/new-car-listings">New Car Listings</Link>
            <Link to="/new-convertibles">New Convertibles</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Used</a>
          <div className="dropdown-content">
            <Link to="/used-car-listings">Used Car Listings</Link>
            <Link to="/used-evs">Used EVs</Link>
            <Link to="/used-suvs">Used SUVs</Link>
            <Link to="/used-trucks">Used Trucks</Link>
            <Link to="/used-vans">Used Vans</Link>
            <Link to="/used-convertibles">Used Convertibles</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Electric</a>
          <div className="dropdown-content">
            <Link to="/ev-hub">EV Hub</Link>
            <Link to="/new-evs">New EVs</Link>
            <Link to="/ev-incentives">EV Incentives</Link>
            <Link to="/ev-deals">EV Deals</Link>
            <Link to="/buyers-guide">Buyers Guide</Link>
          </div>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Research</a>
          <div className="dropdown-content">
            <Link to="/car-reviews">Car Reviews</Link>
            <Link to="/car-rankings">Car Rankings</Link>
            <Link to="/compare-cars">Compare Cars</Link>
            <Link to="/car-finder-quiz">Car Finder Quiz</Link>
          </div>
        </li>
        <li><Link to="/sell-your-car">Sell Your Car</Link></li>
      </ul>
      
      <div className="search-box">
        <input type="text" id="search-input" placeholder="Search cars" />
        <i className="fas fa-search"></i>
        <div className="suggestions-box" id="suggestions-box"></div>
      </div>

      <div className="auth-links">
<<<<<<< HEAD
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
                  <button className="dropdown-logout-btn" onClick={logout}>Log Out</button>
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
=======
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="profile-icon">
        <Link to="/profile"><i className="fas fa-user-circle"></i></Link>
>>>>>>> 2aa5575cbc578acdd56b3ec28a41a4dc564fdb1f
      </div>
    </nav>
  );
};

export default Navbar;
