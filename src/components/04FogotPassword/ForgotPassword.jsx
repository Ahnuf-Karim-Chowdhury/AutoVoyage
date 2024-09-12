<<<<<<< HEAD
import React, { useState } from 'react';
import './ForgotPasswordStyles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data.message); // Display success or error message
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="forgot-body">
      <div className="forgot-container2">
        <h1>Forgot Password</h1>
        <form id="forgotPasswordForm" onSubmit={handleSubmit}>
          <div className="forgot-input-group">
            <label htmlFor="reset-email">Email</label>
            <input
              type="email"
              id="reset-email"
              name="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="forgot-input-group">
            <button type="submit">Reset Password</button>
          </div>
          <div id="reset-message" className="forgot-message"></div>
        </form>
      </div>
    </div>
  );
=======
// ForgotPassword.jsx

import './ForgotPasswordStyles.css'
const ForgotPassword = () => {
    return (
        <div className="centered-container" id="forgot-forgot-password-container">
            <div className="forgot-container2">
                <h1>Forgot Password</h1>
                <form id="forgotPasswordForm">
                    <div className="forgot-input-group">
                        <label htmlFor="reset-email">Email</label>
                        <input type="email" id="reset-email" name="reset-email" required />
                    </div>
                    <div className="forgot-input-group">
                        <button type="submit">Reset Password</button>
                    </div>
                    <div id="reset-message" className="forgot-message"></div>
                </form>
            </div>
        </div>
    );
>>>>>>> 2aa5575cbc578acdd56b3ec28a41a4dc564fdb1f
};

export default ForgotPassword;
