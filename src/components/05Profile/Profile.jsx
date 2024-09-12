import React from 'react';
import './Profile.css'; // Ensure you import the custom CSS file

const Profile = () => {
  return (
    <div className="profile-container">
      <main className="profile-main">
        <div className="profile-card">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            className="profile-image"
          />
          <div className="profile-info">
            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">Email: johndoe@example.com</p>
            <p className="profile-member-since">Member since: January 2022</p>
            <div className="profile-buttons">
              <button className="profile-button edit-button">
                Edit Profile
              </button>
              <button className="profile-button view-listings-button">
                View Listings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
