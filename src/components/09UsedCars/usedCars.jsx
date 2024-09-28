import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './usedCars.css';
import { Link } from "react-router-dom";

const Deals = () => {
  const [usedCars, setUsedCars] = useState([]);  

  useEffect(() => {
    axios.get("http://localhost:6969/cars/get") // Adjust the endpoint to get all cars
      .then((response) => {
        // Filter used cars from the response
        const filteredUsedCars = response.data.filter(car => car.carCondition === 'Used');
        setUsedCars(filteredUsedCars);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  }, []);

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
        ) : null} {/* Show nothing if there are no used cars */}
      </div>
    </div>
  );
};

export default Deals;
