import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import './ViewListing.css';
import { Link } from "react-router-dom";

const ViewListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:6969/cars/listings", {
      withCredentials: true,
    })
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user listings:", error);
  
        if (error.response && error.response.status === 404) {
          // Treat 404 as "no listings found"
          setListings([]);
        } else {
          setError("Failed to load your listings.");
        }
  
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return (
      <div className="loading-container">
        <Circles color="#e91e63" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="deals-container">
      <h1>Your Listings</h1>

      {listings.length > 0 ? (
        <div className="deals-list">
          {listings.map((car) => (
            <Link to={`/car/${car._id}`} key={car._id} style={{ textDecoration: "none" }}>
              <div className="deal-card">
                <img
                  src={car.coverImg || 'default_car_image.jpg'}
                  alt={`${car.carBrand} ${car.carModel}`}
                  className="deal-image"
                />
                <div className="deal-info">
                  <h2>{car.carBrand} {car.carModel}</h2>
                  <p>Year: {car.carYear}</p>
                  <p>Price: {car.carPrice} BDT</p>
                  <p>Mileage: {car.carMileage} km</p>
                  <p>Contact: {car.seller?.telephone || "N/A"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <h2>You haven't listed any cars yet.</h2>
        </div>
      )}
    </div>
  );
};

export default ViewListing;
