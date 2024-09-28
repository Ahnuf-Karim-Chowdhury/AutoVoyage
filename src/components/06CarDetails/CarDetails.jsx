import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './CarDetails.css';

const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:6969/cars/${carId}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [carId]);

  if (!car) {
    return (
      <div className="loading-container">
        <h1>Loading car details...</h1>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="container mt-5">
        <div className="row">
          {/* Carousel for Additional Images */}
          <div className="col-md-6">
            <Carousel>
              {car.carImgs.length > 0 ? (
                car.carImgs.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} alt={`Car Image ${index + 1}`} className="d-block w-100 rounded" />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img src={car.coverImg} alt="Car cover img" className="d-block w-100 rounded" />
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          {/* Car Details Section */}
          <div className="col-md-6 car-info">
            <h1 className="display-4">{car.carBrand} {car.carModel}</h1>
            <h4>Year: {car.carYear}</h4>
            <h4>Price: {car.carPrice} BDT</h4>
            <h4>Condition: {car.carCondition}</h4>
            <h4>Mileage: {car.carMileage} km</h4>
            <h4>Transmission: {car.carTransmission}</h4>
            <h4>Fuel Type: {car.carFuelType}</h4>
            <h4>Exterior Colour: {car.carExteriorColour}</h4>
            <h4>Interior Colour: {car.carInteriorColour}</h4>
            <h4>Seller Notes:</h4>
            <p>{car.carSellerNotes || 'No additional notes available.'}</p>
            <div className="seller-details mt-4">
              <h3 className='h3'>Seller Details</h3>
              <p><strong>Name:</strong> {car.seller.firstName} {car.seller.lastName}</p>
              <p><strong>Email:</strong> <a href={`mailto:${car.seller.email}`} className="text-decoration-none text-white">{car.seller.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${car.seller.telephone}`} className="text-decoration-none text-white">{car.seller.telephone}</a></p>
            </div>
          </div>
        </div>
        {/* Back Button */}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
