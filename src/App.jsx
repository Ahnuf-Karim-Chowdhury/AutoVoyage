import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/01HomePage/HomePage';
import Login from './components/02Login/Login';
import Signup from './components/03SignUp/Signup';
import ForgotPassword from './components/04FogotPassword/ForgotPassword';
import Deals from './components/New/Deals';
import CompareCars from './components/Research/CompareCars';
import CarReviews from './components/Research/CarReviews';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/compare-cars" element={<CompareCars />} />
                    <Route path="/car-reviews" element={<CarReviews />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
