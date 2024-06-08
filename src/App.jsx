
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import

import Navbar from './components/Navbar';
import HomePage from './components/01HomePage/HomePage';
import Login from './components/02Login/Login';
import Signup from './components/03SignUp/Signup'
import ForgotPassword from './components/04FogotPassword/ForgotPassword';


function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/" element={<HomePage />} /> {/* Updated Route */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    

                </Routes>
            </div>
        </Router>
    );
}

export default App;
