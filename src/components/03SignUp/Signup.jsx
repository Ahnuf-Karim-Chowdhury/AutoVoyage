// Signup.jsx
import { Link } from 'react-router-dom'; // Import Link

import React, { useState } from 'react';
import './Signupstyles.css'; // Import your CSS file

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        // Simple client-side validation
        if (email === 'user@example.com' && password === 'password123' && password === confirmPassword) {
            setMessage('SignUp successful!');
            setMessageColor('green');
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setMessageColor('red');
        } else {
            setMessage('Invalid email or password.');
            setMessageColor('red');
        }
    };

    const setMessageColor = (color) => {
        setMessageStyle({ color });
    };

    const [messageStyle, setMessageStyle] = useState({});

    return (
        <div className="signup-body">
{/*             <nav className="login-nav">
                <Link to="/" className="login-navbar-brand">
                    AutoVoyage
                </Link>
            </nav> */}
            <div className="signup-container1">
                {/* SignUp Page */}
                <div className="signup-container2" id="signup-container">
                    <div className="signup-box">
                        <h1>SignUp</h1>
                        <form id="signupForm">
                            <div className="signup-input-group">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" id="first-name" name="first-name" required />
                            </div>
                            <div className="signup-input-group">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" id="last-name" name="last-name" required />
                            </div>
                            <div className="signup-input-group">
                                <label htmlFor="telephone">Telephone</label>
                                <input type="tel" id="telephone" name="telephone" required />
                            </div>
                            <div className="signup-input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="signup-input-group">
                                <label htmlFor="password">Create Password</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <div className="signup-input-group">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" name="confirm-password" required />
                            </div>          <div className="signup-input-group">
                                <button type="submit">SignUp</button>
                            </div>
                        </form>
                        <div id="message" className="signup-message"></div>
                        <div className="signup-forgot-password">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                        <br />
                        <div className="signup-divider-container">
                            <hr className="signup-divider-line" />
                            <span className="signup-divider-text">or</span>
                            <hr className="signup-divider-line" />
                        </div>
                        <br />
                        <br />
                        <div className="signup-input-group">
                            <button type="button" className="google-button">
                                <span className="icon-google"></span> Continue with Google
                            </button>
                        </div>
                        <div className="signup-input-group">
                            <button type="button" className="facebook-button">
                                <span className="icon-facebook"></span> Continue with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Signup;
