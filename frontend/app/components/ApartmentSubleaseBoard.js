import React from 'react';
import './ApartmentSubleaseBoard.css';
import holderPFP from '../../assets/profile/dog.jpg';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../util/FirebaseFuncs';

const ApartmentSubleaseBoard = ({listings}) => {
  const navigation = useNavigation();
  return (
    <div className="bountyContainer">
      <p className="bountyTitle">Subleases Available </p>
      <div className="bountyView">
        {listings.map((sublet) => {
          if (sublet.subleaser_id !== auth.currentUser.displayName) {
            return (
              <div className="bountyCards">
                <img className="bountyImage" src={holderPFP} />
                <img className="bountyImage" src={`data:image/png;base64,${sublet.image}`} />
                <div className="bountyGeneral">
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
