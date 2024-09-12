import React, { useState } from 'react';
import './CarReviews.css';

const CarReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      rating: rating,
      message: message,
    };
    setReviews([...reviews, newReview]);
    setRating(0);
    setMessage('');
  };

  return (
    <div className="car-reviews-container">
      <h2>Car Reviews</h2>
      <div className="review-form">
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="rating-input">
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
          <div className="message-input">
            <label>Review:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <div className="review-rating">
                  Rating: {review.rating} stars
                </div>
                <div className="review-message">{review.message}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarReviews;
