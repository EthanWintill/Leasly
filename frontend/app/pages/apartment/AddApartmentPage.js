import React, {useState, useEffect} from 'react';
import {auth} from '../../util/FirebaseFuncs';

export default function AddApartmentPage(props) {
  const {navigation} = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);


  const add = () => {
    const formdata = new FormData(document.querySelector('#form'));
    const data = Object.fromEntries(formdata.entries());
    data.user_id = auth.currentUser.uid;


    console.log(data);


    fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('home');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  if (!isAuthenticated) {
    return (
      <>
        <h2 style={{color: 'black'}}>You need to sign in to add a new apartment.</h2>
      </>
    );
  } else {
    return (
      <React.Fragment id="mainContainer">
        <div id="signContainer">
          <h1>Add apartment</h1>
          <form id="form">
            <input type="text" name="apartment" placeholder="Enter Apartment Name" />
            <input type="text" name="description" placeholder="Enter description" />
            <input type="text" name="beds" placeholder="Enter number of beds" />
            <input type="text" name="baths" placeholder="Enter number of baths" />
            <input type="text" name="rent" placeholder="Enter rent" />
            <input type="text" name="location" placeholder="Enter location" />
            <input type="text" name="sqft" placeholder="Enter square footage" />
          </form>
          <button type="button" id="createBtn" onClick={() => {
            add();
          }}>Add!</button>
          <div id="signInLink">
            <a href="/" >Cancel</a>
          </div>
          <span id="error-field"> </span>
        </div>
      </React.Fragment>
    );
  }
}

export {
  AddApartmentPage,
};
