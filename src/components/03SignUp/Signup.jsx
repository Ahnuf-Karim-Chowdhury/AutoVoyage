// Signup.jsx
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { produce } from 'immer';
import React, { useState } from 'react';
import './Signupstyles.css'; // Import your CSS file
import '../Navbar.css';
import axios from 'axios';

const url = "http://localhost:6969/auth/register";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: '',
        messageStyle: {},
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(
            produce(draft => {
                draft[name] = value;
            })
        );
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        axios.post(url, formData)
        .then(res => { 
            console.log(res);
            // Show success message
            setFormData(produce(draft => {
                draft.message = "Signup successful! Redirecting to login...";
                draft.messageStyle = { color: "green" };
            }));
            // Redirect to login after 2 seconds
            setTimeout(() => navigate('/login', { replace: true }), 2000);
        })
        .catch(e => {
            console.log(e);
            // Show error message
            setFormData(produce(draft => {
                draft.message = "Signup failed. Please try again.";
                draft.messageStyle = { color: "red" };
            }));
        });
    };

    return (
        <div className="signupBody">
            <div className="signup-container1">
                <div className="signup-container2">
                    <div className="signup-box">
                        <h1>SignUp</h1>
                        <div className="signup-form-container"> {/* New wrapper div */}
                            <form id="signupForm" onSubmit={handleSignupSubmit}>
                                <div className="signup-input-group">
                                    <label htmlFor="first-name">First Name</label>
                                    <input type="text" id="first-name" name="firstName" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <label htmlFor="last-name">Last Name</label>
                                    <input type="text" id="last-name" name="lastName" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <label htmlFor="telephone">Telephone</label>
                                    <input type="tel" id="telephone" name="telephone" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <label htmlFor="password">Create Password</label>
                                    <input type="password" id="password" name="password" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input type="password" id="confirm-password" name="confirm-password" onChange={handleInputChange} required />
                                </div>
                                <div className="signup-input-group">
                                    <button type="submit">SignUp</button>
                                </div>
                            </form>
                        </div>
                        <div id="message" className="signup-message" style={formData.messageStyle}>
                            {formData.message}
                        </div>
                        <div className="signup-forgot-password">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                        <div className="signup-divider-container">
                            <hr className="signup-divider-line" />
                            <span className="signup-divider-text">or</span>
                            <hr className="signup-divider-line" />
                        </div>
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
