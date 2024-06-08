// Login.jsx

import React, { useState } from 'react';
import './Loginstyles.css';
import { Link } from 'react-router-dom'; // Import Link

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        // Simple client-side validation
        if (email === 'user@example.com' && password === 'password123') {
            setMessage('Login successful!');
            setMessageColor('green');
        } else {
            setMessage('Invalid email or password.');
            setMessageColor('red');
        }
    };

    const toggleForgotPassword = () => {
        setForgotPasswordVisible(!forgotPasswordVisible);
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();

        if (resetEmail === 'user@example.com') {
            setResetMessage('Password reset link sent!');
            setResetMessageColor('green');
        } else {
            setResetMessage('Email not found.');
            setResetMessageColor('red');
        }
    };

    const setMessageColor = (color) => {
        setMessageStyle({ color });
    };

    const setResetMessageColor = (color) => {
        setResetMessageStyle({ color });
    };

    const [messageStyle, setMessageStyle] = useState({});
    const [resetMessageStyle, setResetMessageStyle] = useState({});

    return (
        <div className="login-body">
{/*             <nav className="login-nav">
                <Link to="/" className="login-navbar-brand">
                    AutoVoyage
                </Link>
            </nav> */}
            <div className="login-container1">
                {forgotPasswordVisible ? (
                    <div className="login-container2" id="forgot-password-container">
                        <div className="login-box">
                            <h1>Forgot Password</h1>
                            <form id="login-forgotPasswordForm">
                                <div className="login-input-group">
                                    <label htmlFor="reset-email">Email</label>
                                    <input type="email" id="reset-email" name="reset-email" required />
                                </div>
                                <div className="login-input-group">
                                    <button type="submit">Reset Password</button>
                                </div>
                                <div id="reset-message" className="message"></div>
                            </form>
                            <div className="login-forgot-password">
                                <a href="#" id="back-to-login-link">Back to Login</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="login-container2" id="login-container">
                        <div className="login-box">
                            <h1>Login</h1>
                            <form id="loginForm">
                                <div className="login-input-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="login-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" required />
                                </div>
                                <div className="login-input-group">
                                    <button type="submit">Login</button>
                                </div>
                                <div className="login-divider-container">
                                    <hr className="login-divider-line" />
                                    <span className="login-divider-text">or</span>
                                    <hr className="login-divider-line" />
                                </div>
                                <br />
                                <div className="login-input-group">
                                    <button type="button" className="google-button">
                                        <span className="icon-google"></span> Continue with Google
                                    </button>
                                </div>
                                <div className="login-input-group">
                                    <button type="button" className="facebook-button">
                                        <span className="icon-facebook"></span> Continue with Facebook
                                    </button>
                                </div>
                                <div id="login-message" className="login-message"></div>
                            </form>
                            <div className="login-links">
                                <Link to="/signup">
                                    Don't have an account?
                                </Link>
                                <Link to="/forgotpassword" id="login-forgot-password-link" className="right-link">
                                    Forgot Password?
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
