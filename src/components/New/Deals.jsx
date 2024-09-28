import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'; 
import './Deals.css';
import { Link } from "react-router-dom";

const Deals = () => {
  const [recentCars, setRecentCars] = useState([]);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get("http://localhost:6969/cars/recent")  
      .then((response) => {
        setRecentCars(response.data); 
        setLoading(false);  
      })
      .catch((error) => {
        console.error("Error fetching recent cars data:", error);
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
      <h1>Recent Deals</h1>
      <div className="deals-list">
        {recentCars.length > 0 ? (
          recentCars.map((car) => (
            <Link
                to={`/car/${car._id}`}
                key={car._id}
                style={{ textDecoration: "none" }}
              >
              <div className="deal-card" key={car._id}>
                <img src={car.coverImg || 'default_car_image.jpg'} alt={`${car.carBrand} ${car.carModel}`} className="deal-image" />
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
          <h2>No recent deals available at the moment.</h2>
        )}
      </div>
    </div>
  );
};

export default Deals;
