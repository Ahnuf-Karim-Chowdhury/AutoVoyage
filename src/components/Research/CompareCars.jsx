import React, { useState } from 'react';
import './CompareCars.css';

const carData = [
  {
    id: 1,
    name: 'Rolls Royce',
    imageUrl: 'image10.webp',
    price: '$87,000',
    mpg: '30',
    horsepower: '150 hp',
    seating: '4 seats',
    warranty: '3 years / 36,000 miles',
  },
  {
    id: 2,
    name: 'Lamborghini',
    imageUrl: 'image8.jpg',
    price: '$90,000',
    mpg: '28',
    horsepower: '180 hp',
    seating: '2 seats',
    warranty: '5 years / 60,000 miles',
  },
  {
    id: 3,
    name: 'Ford Mustang',
    imageUrl: 'image9.jpeg',
    price: '$54,000',
    mpg: '32',
    horsepower: '160 hp',
    seating: '4 seats',
    warranty: '4 years / 50,000 miles',
  },
];

const CompareCars = () => {
  const [selectedCars, setSelectedCars] = useState([carData[0], carData[1]]);

  const handleCarChange = (index, carId) => {
    const newSelectedCars = [...selectedCars];
    newSelectedCars[index] = carData.find((car) => car.id === Number(carId));
    setSelectedCars(newSelectedCars);
  };

  return (
    <div className="compare-container">
      <h1>Compare Cars</h1>
      <div className="car-selectors">
        {selectedCars.map((car, index) => (
          <div key={index} className="car-selector">
            <label>Select Car {index + 1}:</label>
            <select
              value={car.id}
              onChange={(e) => handleCarChange(index, e.target.value)}
            >
              {carData.map((carOption) => (
                <option key={carOption.id} value={carOption.id}>
                  {carOption.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="compare-table">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              {selectedCars.map((car) => (
                <th key={car.id}>{car.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              {selectedCars.map((car) => (
                <td key={car.id}>
                  <img src={car.imageUrl} alt={car.name} className="car-image" />
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {selectedCars.map((car) => (
                <td key={car.id}>{car.price}</td>
              ))}
            </tr>
            <tr>
              <td>MPG</td>
              {selectedCars.map((car) => (
                <td key={car.id}>{car.mpg}</td>
              ))}
            </tr>
            <tr>
              <td>Horsepower</td>
              {selectedCars.map((car) => (
                <td key={car.id}>{car.horsepower}</td>
              ))}
            </tr>
            <tr>
              <td>Seating</td>
              {selectedCars.map((car) => (
                <td key={car.id}>{car.seating}</td>
              ))}
            </tr>
            <tr>
              <td>Warranty</td>
              {selectedCars.map((car) => (
                <td key={car.id}>{car.warranty}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareCars;
