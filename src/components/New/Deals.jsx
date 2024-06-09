import React, { useState, useEffect } from 'react';
import './Deals.css';

const fetchDeals = () => {
  // Simulating an API call to fetch deals
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Summer Savings Event',
          description: 'Enjoy significant savings of up to $3,000 on select vehicle models this summer!',
          imageUrl: 'image4.jpg',
          expiryDate: '2024-07-01',
          rating: 4.5,
        },
        {
          id: 2,
          title: '0% Financing for 60 Months',
          description: 'Take advantage of 0% APR financing for up to 60 months, available on approved credit.',
          imageUrl: 'image5.jpg',
          expiryDate: '2024-08-15',
          rating: 4.8,
        },
        {
          id: 3,
          title: 'Lease Specials',
          description: 'Lease a new car today with exceptionally low monthly payments. Attractive terms available.',
          imageUrl: 'image6.webp',
          expiryDate: '2024-06-30',
          rating: 4.2,
        },
      ]);
    }, 1000);
  });
};

const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals().then((data) => {
      setDeals(data);
    });
  }, []);

  return (
    <div className="deals-container">
      <h1>Current Deals</h1>
      {deals.length === 0 ? (
        <p>Loading deals...</p>
      ) : (
        <div className="deals-list">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <img src={deal.imageUrl} alt={deal.title} className="deal-image" />
              <div className="deal-info">
                <h2>{deal.title}</h2>
                <p>{deal.description}</p>
                <p className="deal-expiry">Expires on: {new Date(deal.expiryDate).toLocaleDateString()}</p>
                <div className="deal-rating">
                  {'⭐'.repeat(Math.floor(deal.rating))}{' '}
                  {deal.rating % 1 ? '⭐️' : ''} ({deal.rating})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;
