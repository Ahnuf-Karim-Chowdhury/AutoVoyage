import React, { useState } from 'react';
import './Loginstyles.css';
import useWindowSize from "../utils/useWindowSize.js";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState({});
    const [resetMessageStyle, setResetMessageStyle] = useState({});

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (email === 'user@example.com' && password === 'password123') {
            setMessage('Login successful!');
            setMessageStyle({ color: 'green' });
        } else {
            setMessage('Invalid email or password.');
            setMessageStyle({ color: 'red' });
        }
    };

    const toggleForgotPassword = () => {
        setForgotPasswordVisible(!forgotPasswordVisible);
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();

        if (resetEmail === 'user@example.com') {
            setResetMessage('Password reset link sent!');
            setResetMessageStyle({ color: 'green' });
        } else {
            setResetMessage('Email not found.');
            setResetMessageStyle({ color: 'red' });
        }
    };

    const { width } = useWindowSize();

    return (
        <div className="login-body">
            <div className="login-container1">
                {forgotPasswordVisible ? (
                    <div className="login-container2" id="forgot-password-container">
                        <div className="login-box">
                            <h1>Forgot Password</h1>
                            <form id="login-forgotPasswordForm" onSubmit={handleForgotPasswordSubmit}>
                                <div className="login-input-group">
                                    <label htmlFor="reset-email">Email</label>
                                    <input
                                        type="email"
                                        id="reset-email"
                                        name="reset-email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="login-input-group">
                                    <button type="submit">Reset Password</button>
                                </div>
                                <div id="reset-message" className="message" style={resetMessageStyle}>
                                    {resetMessage}
                                </div>
                            </form>
                            <div className="login-forgot-password">
                                <a href="#" onClick={toggleForgotPassword} id="back-to-login-link">Back to Login</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`login-container2 ${width < 500 ? 'mobile' : ''}`} id="login-container">
                        <div className="login-box">
                            <h1>Login</h1>
                            <form id="loginForm" onSubmit={handleLoginSubmit}>
                                <div className="login-input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="login-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
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
                                <div id="login-message" className="login-message" style={messageStyle}>
                                    {message}
                                </div>
                            </form>
                            <div className="login-links">
                                <Link to="/signup">
                                    Don't have an account?
                                </Link>
                                <Link to="/forgotpassword" onClick={toggleForgotPassword} id="login-forgot-password-link" className="right-link">
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
