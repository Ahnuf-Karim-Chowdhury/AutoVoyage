import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:6969/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch profile: ${errorText}`);
        }
      } catch (error) {
        setError(`Error fetching profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);

      if (file) {
        formDataToSend.append("profilePicture", file);
      }

      const response = await fetch("http://localhost:6969/auth/profile", {
        method: "PUT",
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        const errorText = await response.text();
        setError(`Failed to update profile: ${errorText}`);
      }
    } catch (error) {
      setError(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-container">
      <main className="profile-main">
        <div className="profile-card">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />

          <div className="profile-info">
            <h2 className="profile-name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="profile-email">Email: {user.email}</p>
            <p className="profile-member-since">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="profile-buttons">
              <button
                className="profile-button edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button className="profile-button view-listings-button">
                View Listings
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="edit-form">
            <h1 className="bold-big">Edit Profile</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Profile Picture:
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  style={{ marginRight: '10px' }}
                />
              </label>
              <br />
              <br />
              <button className="button-spacing" type="submit">
                Save Changes
              </button>
              <button className="cancel-button" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
