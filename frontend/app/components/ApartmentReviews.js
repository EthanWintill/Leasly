import React from 'react';
import './ApartmentReviews.css';

export default function ApartmentReviews({identifier}) {
  return (
    <div className="reviewContainer">
      <p className="reviewTitle"> Reviews</p>
      <div className="reviewList">
        <div className="uniqueReview">
          <img className="reviewerPFP" />
          <p className="reviewerUsername">Slippin' Jimmy</p>
          <p className="reviewerRating"> Rating </p>
          <p className="reviewerStory">Praesent cursus scelerisque orci vitae ornare. Sed volutpat ullamcorper interdum.
                        Nulla consequat lectus at lorem blandit laoreet. Vivamus posuere nunc sit amet leo ultrices,
                        id suscipit justo imperdiet. Donec non tristique ipsum, ut tristique risus. Quisque posuere
                        erat at diam finibus, et euismod enim vehicula.</p>
        </div>
      </div>
    </div>
  );
}

export {
  ApartmentReviews,
};
