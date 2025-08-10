import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'; 
import './UsedCarListing.css'; 
import { Link } from "react-router-dom";

const UsedCarListing = () => {
  const [usedCars, setUsedCars] = useState([]);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get("http://localhost:6969/cars/used-car")  
      .then((response) => {
        setUsedCars(response.data); 
        setLoading(false);  
      })
      .catch((error) => {
        console.error("Error fetching used cars data:", error);
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

  return (
    <div className="deals-container">
      <h1>Used Cars</h1>
      <div className="deals-list">
        {usedCars.length > 0 ? (
          usedCars.map((car) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id}
              style={{ textDecoration: "none" }}
            >
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
                  <p>Contact: {car.seller.telephone}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h2>No used cars available at the moment.</h2>
        )}
      </div>
    </div>
  );
};

export default UsedCarListing;
