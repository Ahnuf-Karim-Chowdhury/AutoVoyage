import React, { useState } from 'react';
import './CarFinderQuiz.css';

const CarFinderQuiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    budget: '',
    bodyType: '',
    fuelType: '',
    brand: '',
    driveType: '',
    transmission: '',
    color: ''
  });
  
  const [suggestedCars, setSuggestedCars] = useState([]);

  const handleOptionChange = (category, value) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [category]: value,
    }));
  };

  const cars = [
    { name: 'Toyota Camry', budget: 20000, bodyType: 'sedan', fuelType: 'electric', brand: 'Toyota' },
    { name: 'Honda Civic', budget: 20000, bodyType: 'suv', fuelType: 'gasoline', brand: 'Ford' },
    { name: 'Volkswagen Jetta', budget: 20000, bodyType: 'truck', fuelType: 'hybrid', brand: 'Honda' },
    { name: 'Ford Focus', budget: 20000, bodyType: 'sedan', fuelType: 'Diesel', brand: 'Tesla' },
    { name: 'Chevrolet Cruze', budget: 20000, bodyType: 'sedan', fuelType: 'gasoline', brand: 'Chevrolet' },
    { name: 'Mercedes-Benz GLA', budget: 50000, bodyType: 'sedan', fuelType: 'electric', brand: 'Toyota' },
    { name: 'Volvo XC40', budget: 50000, bodyType: 'suv', fuelType: 'gasoline', brand: 'Ford' },
    { name: 'Mazda CX-5', budget: 50000, bodyType: 'truck', fuelType: 'hybrid', brand: 'Honda' },
    { name: 'Nissan Altima', budget: 50000, bodyType: 'sedan', fuelType: 'Diesel', brand: 'Tesla' },
    { name: 'Tesla Model 3', budget: 50000, bodyType: 'sedan', fuelType: 'gasoline', brand: 'Chevrolet' },
    { name: 'BMW X1', budget: 60000, bodyType: 'sedan', fuelType: 'electric', brand: 'Toyota' },
    { name: 'Kia Sorento', budget: 60000, bodyType: 'suv', fuelType: 'gasoline', brand: 'Ford' },
    { name: 'Hyundai Tucson', budget: 60000, bodyType: 'truck', fuelType: 'hybrid', brand: 'Honda' },
    { name: 'Honda CR-V', budget: 60000, bodyType: 'sedan', fuelType: 'Diesel', brand: 'Tesla' },
    { name: 'Subaru Outback', budget: 60000, bodyType: 'sedan', fuelType: 'gasoline', brand: 'Chevrolet' },
    { name: 'Kia Forte LX', budget: 90000, bodyType: 'sedan', fuelType: 'electric', brand: 'Toyota' },
    { name: 'Jeep Patriot Sport', budget: 90000, bodyType: 'suv', fuelType: 'Diesel', brand: 'Ford' },
    { name: 'Honda Odyssey EX-L', budget: 90000, bodyType: 'truck', fuelType: 'gasoline', brand: 'Honda' },
    { name: 'MINI Hardtop 4 Door Cooper', budget: 90000, bodyType: 'sedan', fuelType: 'Diesel', brand: 'Tesla' },
    { name: 'Mitsubishi Mirage ES', budget: 90000, bodyType: 'sedan', fuelType: 'hybrid', brand: 'Chevrolet' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filteredCars = cars.filter(car => {
      return (
        (selectedOptions.budget === '' || car.budget <= parseInt(selectedOptions.budget)) &&
        (selectedOptions.bodyType === '' || car.bodyType === selectedOptions.bodyType) &&
        (selectedOptions.fuelType === '' || car.fuelType === selectedOptions.fuelType) &&
        (selectedOptions.brand === '' || car.brand.toLowerCase().includes(selectedOptions.brand.toLowerCase()))
      );
    });

    setSuggestedCars(filteredCars);
  };

  return (
    <div className="car-finder-quiz">
      <h2>Find Your Perfect Car or Truck</h2>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <p>What is your budget?</p>
          <select
            value={selectedOptions.budget}
            onChange={e => handleOptionChange('budget', e.target.value)}
          >
            <option value="">Select Budget</option>
            <option value="20000">$20,000</option>
            <option value="50000">$50,000</option>
            <option value="60000">$60,000</option>
            <option value="90000">$90,000</option>
          </select>
        </div>
        <div className="question">
          <p>What body type do you prefer?</p>
          <select
            value={selectedOptions.bodyType}
            onChange={e => handleOptionChange('bodyType', e.target.value)}
          >
            <option value="">Select Body Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div className="question">
          <p>What fuel type do you prefer?</p>
          <select
            value={selectedOptions.fuelType}
            onChange={e => handleOptionChange('fuelType', e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div className="question">
          <p>Which brand do you prefer?</p>
          <select
            value={selectedOptions.brand}
            onChange={e => handleOptionChange('brand', e.target.value)}
          >
            <option value="">Select Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="Tesla">Tesla</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </div>
        <div className="question">
          <p>What drive type do you prefer?</p>
          <select
            value={selectedOptions.driveType}
            onChange={e => handleOptionChange('driveType', e.target.value)}
          >
            <option value="">Select Drive Type</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
        </div>
        <div className="question">
          <p>What transmission type do you prefer?</p>
          <select
            value={selectedOptions.transmission}
            onChange={e => handleOptionChange('transmission', e.target.value)}
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
          </select>
        </div>
        <div className="question">
          <p>What color do you prefer?</p>
          <select
            value={selectedOptions.color}
            onChange={e => handleOptionChange('color', e.target.value)}
          >
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <button type="submit">Find Cars/Trucks</button>
      </form>
      {suggestedCars.length > 0 ? (
        <div className="result">
          <h3>Suggested Cars/Trucks:</h3>
          <ul>
            {suggestedCars.map(car => (
              <li key={car.name}>{car.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-result">
          <h3>No cars or trucks match your criteria. Try again !</h3>
        </div>
      )}
    </div>
  );
};

export default CarFinderQuiz;
