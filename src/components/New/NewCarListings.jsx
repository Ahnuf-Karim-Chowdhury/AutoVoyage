import React, { useState, useEffect } from 'react';
import './NewCarListings.css';

const fetchNewCarListings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: '2024 Tesla Model S',
          description: 'Electric luxury sedan with up to 396 miles of range.',
          imageUrl: 'image11.webp',
          features: [
            '396 miles range',
            '0-60 mph in 1.99 seconds',
            'Top speed of 200 mph',
            'Autopilot capabilities',
          ],
        },
        {
          id: 2,
          title: '2024 Ford Mustang Mach-E',
          description: 'All-electric SUV with exhilarating performance.',
          imageUrl: 'image12.jpg',
          features: [
            '300 miles range',
            '0-60 mph in 3.5 seconds',
            'Ford Co-Pilot360™ technology',
            'Spacious interior',
          ],
        },
        {
          id: 3,
          title: '2024 Chevrolet Corvette',
          description: 'High-performance sports car with a mid-engine design.',
          imageUrl:  'image13.jpg',
          features: [
            '495 hp',
            '0-60 mph in 2.9 seconds',
            'Top speed of 194 mph',
            'Advanced aerodynamics',
          ],
        },
      ]);
    });
  });
};

const NewCarListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchNewCarListings().then((data) => {
      setListings(data);
    });
  }, []);

  return (
    <div className="new-car-listings-container">
      <h1>New Car Listings</h1>
      {listings.length === 0 ? (
        <p>Loading listings...</p>
      ) : (
        <div className="listings">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-poster">
              <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
              <div className="listing-info">
                <h2>{listing.title}</h2>
                <p>{listing.description}</p>
                <ul className="listing-features">
                  {listing.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCarListings;
