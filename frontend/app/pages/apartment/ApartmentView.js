
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { MaterialIcons } from 'react-native-vector-icons';


import ApartmentReviews from '../../components/ApartmentReviews';
import ApartmentSubleaseBoard from '../../components/ApartmentSubleaseBoard';

import testur from '../../../assets/apartments/apartment.jpg';
import './ApartmentView.css';

export default function ViewApartmentPage({name, navigation}) {
  const [data, setdata] = useState({
    listings: [],
  });
    /* needed functions
        - api call to flask backend, gets apartment based on a search for id, returns this in json format, then renders page with apartments info such as listings and ammenities
        - section that lists all sublistings on this apartment
        - button to send message to user to inquire about sublease
        - button to post a subleasing, redirects to sublease button from HomePage.


    */
  console.log(name);
  useEffect(() => {
    fetch('https://leaslybackend.herokuapp.com/api/sublets?apartment=' + name).then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        // only one listing rn, feel free to add some
        setdata({
          listings: data,
        });
        console.log(data);
      }),
    );
  }, [name]);

  return (
    <div>
      <div className="aptmntViewContainer">

        <div className="apartmentInfoContainer">

          <img className="apartmentImage" src={testur} />

          <div className="apartmentInfo">
            <p className="apartmentName"> {name}</p>
            <p> rating</p>
            <p> 4.5/5</p>
            <p> apartment link</p>
            <a> a link to the apartment website </a>
            <p> (512) - 512-5123</p>
            <p> amenities</p>
            <div className="amenitiesContainer">
              {/* 9 divs acting as cards, one for each amenitie, arranged in a flex container*/}
              {/*change the colors lol red is horrible, but the default color */}
              <div>
                <MaterialIcons name="pets" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="spa" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="directions-run" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons  name="ac-unit" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="bus-alert" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="person" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="dry-cleaning" size={32} color="red" />
              </div>
              <div>
                <MaterialIcons name="king-bed" size={32} color="red" />
              </div>
            </div>
          </div>
        </div>
        <div className="subleaseViewContainer">
          <ApartmentSubleaseBoard listings={data.listings}   />
        </div>

        <div className="reviewViewContainer">
          <ApartmentReviews identifier={name}/>
        </div>

      </div>
    </div>
  );
}

export {
  ViewApartmentPage,
};
