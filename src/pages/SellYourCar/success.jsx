import React from 'react';
import { Link } from 'react-router-dom';

const CarSubmissionSuccess = () => {
    return (
        <>
            <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Your car has been submitted and will be listed once it has been verified.</h1>
                <div>
                    <Link to="/" className="btn btn-primary">Go to Homepage</Link>
                </div>
            </div>
        </>
    );
}

export default CarSubmissionSuccess;
