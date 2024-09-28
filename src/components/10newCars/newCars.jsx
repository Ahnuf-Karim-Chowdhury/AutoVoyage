import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newcars.css'; // You may want to rename this to something more appropriate like 'cars.css'
import { Link } from "react-router-dom";

const NewCars = () => {
  const [newCars, setNewCars] = useState([]);  

  useEffect(() => {
    axios.get("http://localhost:6969/cars/get") // Adjust the endpoint to get all cars
      .then((response) => {
        // Filter new cars from the response
        const filteredNewCars = response.data.filter(car => car.carCondition === 'New');
        setNewCars(filteredNewCars);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  }, []);

  return (
    <div className="deals-container">
      <h1>New Cars</h1>
      <div className="deals-list">
        {newCars.length > 0 ? (
          newCars.map((car) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id}
              style={{ textDecoration: "none" }}
            >
              <div className="deal-card">
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
        ) : null} {/* Show nothing if there are no new cars */}
      </div>
    </div>
  );
};

export default NewCars;
