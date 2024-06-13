import React, { useState } from 'react';
import './Loginstyles.css';
import useWindowSize from "../utils/useWindowSize.js";
import { Link } from 'react-router-dom';
import { produce } from 'immer';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        message: '',
        forgotPasswordVisible: false,
        resetEmail: '',
        resetMessage: '',
        messageStyle: {},
        resetMessageStyle: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(produce(draft => {
            draft[name] = value;
        }));
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        setState(produce(draft => {
            if (state.email === 'user@example.com' && state.password === 'password123') {
                draft.message = 'Login successful!';
                draft.messageStyle = { color: 'green' };
            } else {
                draft.message = 'Invalid email or password.';
                draft.messageStyle = { color: 'red' };
            }
        }));
    };

    const toggleForgotPassword = () => {
        setState(produce(draft => {
            draft.forgotPasswordVisible = !draft.forgotPasswordVisible;
        }));
    };

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();

        setState(produce(draft => {
            if (state.resetEmail === 'user@example.com') {
                draft.resetMessage = 'Password reset link sent!';
                draft.resetMessageStyle = { color: 'green' };
            } else {
                draft.resetMessage = 'Email not found.';
                draft.resetMessageStyle = { color: 'red' };
            }
        }));
    };

    const { width } = useWindowSize();

    return (
        <div className="login-body">
            <div className="login-container1">
                {state.forgotPasswordVisible ? (
                    <div className="login-container2" id="forgot-password-container">
                        <div className="login-box">
                            <h1>Forgot Password</h1>
                            <form id="login-forgotPasswordForm" onSubmit={handleForgotPasswordSubmit}>
                                <div className="login-input-group">
                                    <label htmlFor="reset-email">Email</label>
                                    <input
                                        type="email"
                                        id="reset-email"
                                        name="resetEmail"
                                        value={state.resetEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="login-input-group">
                                    <button type="submit">Reset Password</button>
                                </div>
                                <div id="reset-message" className="login-message" style={state.resetMessageStyle}>
                                    {state.resetMessage}
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
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="login-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleChange}
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
                                <div id="login-message" className="login-message" style={state.messageStyle}>
                                    {state.message}
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
