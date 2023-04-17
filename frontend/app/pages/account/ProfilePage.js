import React, {useState, useEffect} from 'react';
import {auth} from '../../util/FirebaseFuncs';

export default function ProfilePage() {
  const [data, setdata] = useState({
    listings: [],
    reviews: [],
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the listings API
    fetch('https://leaslybackend.herokuapp.com/api/sublets?user=' + auth.currentUser.displayName).then((res) =>
      res.json().then((sublets) => {
        // Setting data for listings
        setdata((prevData) => ({
          ...prevData,
          listings: sublets,
        }));
      }),
    );

    // Using fetch to fetch the reviews API
    fetch('https://leaslybackend.herokuapp.com/api/review?name=' + auth.currentUser.displayName).then((res) =>
      res.json().then((reviews) => {
        // Setting data for reviews
        setdata((prevData) => ({
          ...prevData,
          reviews: reviews,
        }));
      }),
    );
  }, []);

  return (
    <div>
      <h1 style={{color: 'black'}}>Username</h1>
      <p>{auth.currentUser.displayName}</p>
      <h1 style={{color: 'black'}}>Your listings</h1>
      <div className="listings">
        {data.listings.map((sublet) =>
          <div key={sublet.rent}>
            <ul>
              <li>Apartment name: {sublet.apartment_name}</li>
              <li>Price: {sublet.rent}</li>
              <li>Start date: {sublet.start_date}</li>
              <li> Floor Plan: {sublet.bed} bed, {sublet.bath} bath</li>
              <li>Listing description: {sublet.description}</li>
            </ul>
          </div>,
        )}

      </div>

      <h1 style={{color: 'black'}}>Your reviews</h1>
      <div className="reviews">
        {data.reviews.map((review) =>
          <div key={review.id}>
            <ul>
              <li>Apartment name: {review.apartment_name}</li>
              <li>Rating: {review.rating}</li>
              <li>Comment: {review.comment}</li>
            </ul>
          </div>,
        )}
      </div>
    </div>
  );
}

export {
  ProfilePage,
};
