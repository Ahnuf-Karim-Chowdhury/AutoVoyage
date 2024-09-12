import React, { useState, useEffect } from 'react';
import './NewConvertibles.css';

const fetchConvertiblesData = () => {
  // Simulating an API call to fetch convertible car data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: '2024 Mercedes-Benz SL-Class',
          description: 'The new SL-Class combines thrilling performance with luxurious comfort.',
          imageUrl: 'image1.jpg',
          features: [
            'Available in V8 and V12 variants',
            'Retractable hardtop convertible',
            'Advanced driver assistance systems',
            'Premium interior materials',
          ],
        },
        {
          id: 2,
          title: '2024 Porsche 911 Cabriolet',
          description: 'Experience open-top driving with the iconic Porsche 911 Cabriolet.',
          imageUrl: 'image2.jpg',
          features: [
            'Iconic design with modern enhancements',
            'Available in various performance trims',
            'Advanced aerodynamics for stability',
            'High-quality convertible top materials',
          ],
        },
        {
          id: 3,
          title: '2024 BMW 4 Series Convertible',
          description: 'Enjoy the freedom of the open road with the BMW 4 Series Convertible.',
          imageUrl: 'image3.jpg',
          features: [
            'Sporty design with dynamic lines',
            'Efficient powertrain options',
            'Enhanced driving dynamics',
            'Luxurious interior amenities',
          ],
        },
        {
          id: 4,
          title: '2024 Audi A5 Cabriolet',
          description: 'Combine elegance and performance with the Audi A5 Cabriolet.',
          imageUrl: 'image4.jpg',
          features: [
            'Timeless design with modern elements',
            'Smooth and responsive driving experience',
            'Advanced infotainment system',
            'Premium convertible top materials',
          ],
        },
      ]);
    });
  });
};

const NewConvertibles = () => {
  const [convertibles, setConvertibles] = useState([]);

  useEffect(() => {
    fetchConvertiblesData().then((data) => {
      setConvertibles(data);
    });
  }, []);

  return (
    <div className="convertibles-container">
      <h1>New Convertibles</h1>
      <div className="convertibles-list">
        {convertibles.map((car) => (
          <article key={car.id} className="convertible-article">
            <img src={car.imageUrl} alt={car.title} className="convertible-image" />
            <div className="article-content">
              <h2>{car.title}</h2>
              <p>{car.description}</p>
              <ul className="car-features">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewConvertibles;
