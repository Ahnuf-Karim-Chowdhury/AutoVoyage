// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/01HomePage/HomePage';
import Login from './components/02Login/Login';
import Signup from './components/03SignUp/Signup';
import ForgotPassword from './components/04FogotPassword/ForgotPassword';
import Profile from './components/05Profile/Profile';
import Deals from './components/New/Deals';
import CompareCars from './components/Research/CompareCars';
import CarReviews from './components/Research/CarReviews';
import NewCarListings from './components/New/NewCarListings'; 
import NewConvertibles from './components/New/NewConvertibles';
import CarFinderQuiz from './components/Research/CarFinderQuiz';
import SellYourCar from './pages/SellYourCar/SellYourCar';
import './components/Navbar.css'; // Import Navbar CSS
import './components/03SignUp/Signupstyles.css'; // Import Signup Styles CSS
import React, { useState, useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in, for example by checking a token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <div className='mb-10'>
                <Navbar isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/compare-cars" element={<CompareCars />} />
                    <Route path="/car-reviews" element={<CarReviews />} />
                    <Route path="/new-car-listings" element={<NewCarListings />} />
                    <Route path="/new-convertibles" element={<NewConvertibles />} />
                    <Route path="/car-finder-quiz" element={<CarFinderQuiz />} />
                    <Route path="/sell-your-car" element={<SellYourCar />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
