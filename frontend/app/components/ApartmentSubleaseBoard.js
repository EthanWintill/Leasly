import React from 'react';
import './ApartmentSubleaseBoard.css';
import holderPFP from '../../assets/profile/dog.jpg';

const ApartmentSubleaseBoard = ({listings}) => {
  return (
    <div className="bountyContainer">
      <p className="bountyTitle">Subleases Available </p>
      <div className="bountyView">
        {listings.map((sublet) =>
          <div className="bountyCards">
            <img className="bountyImage" src={holderPFP} />
            <div className="bountyGeneral">
              <p> Floor Plan: {sublet.bed} bed, {sublet.bath} bath</p>
              <p> Price: ${sublet.rent}/month</p>
              <p> Duration:  </p>
            </div>
            <div className="bountyDescription">
              <p> {sublet.description}</p>
              <button> Message </button>
            </div>

          </div>,
        )}
      </div>
    </div>
  );
};

export default ApartmentSubleaseBoard;
