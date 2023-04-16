import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import './ApartmentReviews.css';

export default function ApartmentReviews({ identifier }) {
  const ApartmentName = identifier;
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://leaslybackend.herokuapp.com/api/review?apartment=${ApartmentName}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [ApartmentName]);

  return (
    <div className="reviewContainer">
      <p className="reviewTitle"> Reviews</p>
      <div className="reviewList">
        {reviews.map((review) => (
          <div className="uniqueReview" key={review.id}>
            <img className="reviewerPFP" />
            <p className="reviewerUsername">Name: {review.user_id}</p>
            <p className="reviewerRating">Rating: {review.rating}</p>
            <p className="reviewerStory">{review.comment}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          navigation.navigate('review', { ApartmentName });
        }}
      >
        Write a review!
      </button>
    </div>
  );
}

export { ApartmentReviews };
