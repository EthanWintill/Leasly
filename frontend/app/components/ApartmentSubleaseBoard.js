import React from 'react';
import './ApartmentSubleaseBoard.css';
import {useNavigation} from '@react-navigation/native';


const ApartmentSubleaseBoard = ({listings}) => {
  const navigation = useNavigation();
  return (
    <div className="bountyContainer">
      <p className="bountyTitle">Subleases Available </p>
      <div className="bountyView">
        {(listings.length === 0) ? <p className="noSubleases"> No Current Subleases!</p> :
          listings.map((sublet) => {
            if (sublet.subleaser_id) {
              return (
                <div className="bountyCards">
                  <img className="bountyImage" src={`data:image/png;base64,${sublet.image}`} />
                  <div className="bountyGeneral">
                    <p> {sublet.apartment_name}</p>
                    <p> Poster: {sublet.subleaser_id}</p>
                    <p> Floor Plan: {sublet.bed} bed, {sublet.bath} bath</p>
                    <p> Price: ${sublet.rent}/month</p>
                  </div>
                  <div className="bountyDescription">
                    <p> {sublet.description}</p>
                    <button type="button" onClick={() => {
                      navigation.navigate('messages', {sublet: sublet.subleaser_id});
                    }}> Message </button>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default ApartmentSubleaseBoard;
