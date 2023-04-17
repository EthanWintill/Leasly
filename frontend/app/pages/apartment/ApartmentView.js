
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {MaterialIcons} from 'react-native-vector-icons';
// import {View} from 'native-base';
import ApartmentReviews from '../../components/ApartmentReviews';
import ApartmentSubleaseBoard from '../../components/ApartmentSubleaseBoard';
import testur from '../../../assets/apartments/apartment.jpg';
import './ApartmentView.css';

/* needed functions
        - add image links
        - section that lists all sublistings on this apartment
        - button to send message to user to inquire about sublease redirects to messages passing the subleasers username.
        - button to post a subleasing, redirects to sublease button from HomePage.
    */


export default function ViewApartmentPage({ }) {
  const [data, setdata] = useState({
    listings: [],
  });
  const info = useRoute().params.apartment;
  useEffect(() => {
    fetch('https://leaslybackend.herokuapp.com/api/sublets?apartment=' + info.name).then((res) =>
      res.json().then((sublets) => {
        // Setting a data from api
        setdata({
          listings: sublets,
        });
        console.log(sublets);
      }),
    );
    // eslint-disable-next-line
  }, []);

  return (
    {/* View goes here, but i don't know how to make this one specifically light themed*/ },
    <div className="aptmntViewContainer">
      <div className="apartmentInfoContainer">
        <img className="apartmentImage" src={testur} />
        <div className="apartmentInfo">
          <p className="apartmentName"> {info.name}</p>
          <p> Rating</p>
          <p> {info.rating}/5</p>
          <p> Apartment Info</p>
          <a> {info.link} </a>
          <p> {info.phone}</p>
          <p> Amenities</p>
          <div className="amenitiesContainer">
            {/* 9 divs acting as cards, one for each amenitie, arranged in a flex container*/}
            {info.pets && <div> <p> Pet Friendly </p> <MaterialIcons name="pets" size={32} color="white" /> </div>}
            {info.pool && <div> <p> Facility Pool </p> <MaterialIcons name="spa" size={32} color="white" /></div>}
            {info.gym && <div> <p> Facility Gym </p> <MaterialIcons name="directions-run" size={32} color="white" /> </div>}
            {info.incldUtilities && <div> <p> Utilities Included </p> <MaterialIcons name="ac-unit" size={32} color="white" /></div>}
            {info.shuttleRte && <div> <p> Bus Route</p> <MaterialIcons name="bus-alert" size={32} color="white" /></div>}
            {info.indvLeasing && <div> <p> individual lease</p> <MaterialIcons name="person" size={32} color="white" /> </div>}
            {info.wsherDryer && <div> <p> Laundry included </p> <MaterialIcons name="dry-cleaning" size={32} color="white" /></div>}
            {info.furnished && <div> <p> Furnished </p> <MaterialIcons name="king-bed" size={32} color="white" /></div>}
          </div>
        </div>
      </div>
      <div className="subleaseViewContainer">
        <ApartmentSubleaseBoard listings={data.listings} />
      </div>
      <div className="reviewViewContainer">
        <ApartmentReviews identifier={info.name} />
      </div>
    </div>
  );
}

export {
  ViewApartmentPage,
};
