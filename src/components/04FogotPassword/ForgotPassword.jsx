// ForgotPassword.jsx

import './ForgotPasswordStyles.css'
const ForgotPassword = () => {
    return (
        <div className="forgot-body" >
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
};

export default ForgotPassword;
