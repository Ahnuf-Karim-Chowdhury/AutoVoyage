// Signup.jsx
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { produce } from 'immer';
import React, { useState } from 'react';
import './Signupstyles.css'; // Import your CSS file
import '../Navbar.css'
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

    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(
            produce(draft => {
                draft[name] = value;
                if (name === 'confirmPassword') {
                    if (draft.password !== value) {
                        draft.message = 'Passwords do not match.';
                        draft.messageStyle = { color: 'red' };
                    } else {
                        draft.message = '';
                        draft.messageStyle = {};
                    }
                }
            })
        );
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setFormData(
                produce(draft => {
                    draft.message = 'Passwords do not match.';
                    draft.messageStyle = { color: 'red' };
                })
            );
            return;
        }

        try {
            const response = await axios.post(url, formData, { withCredentials: true });
            if (response.status === 201) {
                setFormData(
                    produce(draft => {
                        draft.message = 'SignUp successful!';
                        draft.messageStyle = { color: 'green' };
                    })
                );
                navigate('/login'); // Redirect to home page on successful signup
            } else {
                setFormData(
                    produce(draft => {
                        draft.message = 'Signup failed. Please try again.';
                        draft.messageStyle = { color: 'red' };
                    })
                );
            }
        } catch (error) {
            if (error.response) {
                setFormData(
                    produce(draft => {
                        draft.message = error.response.data;
                        draft.messageStyle = { color: 'red' };
                    })
                );
            } else {
                setFormData(
                    produce(draft => {
                        draft.message = 'An unexpected error occurred. Please try again later.';
                        draft.messageStyle = { color: 'red' };
                    })
                );
            }
            console.log(error.message);
            console.error(error.message);
        }
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
                                    <input type="password" id="confirm-password" name="confirmPassword" onChange={handleInputChange} required />
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
