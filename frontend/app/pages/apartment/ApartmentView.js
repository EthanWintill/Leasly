
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {MaterialIcons} from 'react-native-vector-icons';
// import {View} from 'native-base';
import ApartmentReviews from '../../components/ApartmentReviews';
import ApartmentSubleaseBoard from '../../components/ApartmentSubleaseBoard';
import testur from '../../../assets/apartments/apartment.jpg';
import './ApartmentView.css';

/* needed functions
        - fill out apartment amenities and info on Db, and add image links etc, then use that to turn off the icons that come back false on ammenities, and fill in ratings etc
        - section that lists all sublistings on this apartment
        - button to send message to user to inquire about sublease redirects to messages passing the subleasers username.
        - button to post a subleasing, redirects to sublease button from HomePage.
    */


export default function ViewApartmentPage({}) {
  const [data, setdata] = useState({
    listings: [],
  });
  const info = useRoute().params.apartment;
  useEffect(() => {
    fetch('https://leaslybackend.herokuapp.com/api/sublets?apartment=' + info.name).then((res) =>
      res.json().then((sublets) => {
        // Setting a data from api
        // only one listing rn, feel free to add some
        setdata({
          listings: sublets,
        });
        console.log(data);
      }),
    );
  });

  return (
    {/* View goes here, but i don't know how to make this one specifically light themed*/},
    <div className="aptmntViewContainer">
      <div className="apartmentInfoContainer">
        <img className="apartmentImage" src={testur} />
        <div className="apartmentInfo">
          <p className="apartmentName"> {info.name}</p>
          <p> rating</p>
          <p> 4.5/5</p>
          <p> apartment link</p>
          <a> a link to the apartment website </a>
          <p> (512) - 512-5123</p>
          <p> amenities</p>
          <div className="amenitiesContainer">
            {/* 9 divs acting as cards, one for each amenitie, arranged in a flex container*/}
            {/* change the colors lol red is horrible, but the default color */}
            <div>
              <MaterialIcons name="pets" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="spa" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="directions-run" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="ac-unit" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="bus-alert" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="person" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="dry-cleaning" size={32} color="white" />
            </div>
            <div>
              <MaterialIcons name="king-bed" size={32} color="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="subleaseViewContainer">
        <ApartmentSubleaseBoard listings={data.listings} />
      </div>
      <div className="reviewViewContainer">
        <ApartmentReviews identifier={name}/>
      </div>
    </div>
  );
}

export {
  ViewApartmentPage,
};
