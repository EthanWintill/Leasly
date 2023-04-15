import React, { useState, useEffect } from 'react';
import { auth } from '../../util/FirebaseFuncs';
import axios from 'axios';


export default function AddApartmentPage(props) {
  const {navigation} = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    apartment: '',
    rent: '',
    bed: '',
    bath: '',
    sqft: '',
    description: '',
    location: '',
    image: null,
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('user_id', auth.currentUser.displayName);
    formDataToSend.append('apartment', formData.apartment);
    formDataToSend.append('rent', formData.rent);
    formDataToSend.append('bed', formData.bed);
    formDataToSend.append('bath', formData.bath);
    formDataToSend.append('sqft', formData.sqft);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('image', formData.image);

    axios.post('https://leaslybackend.herokuapp.com/api/listings', formDataToSend)
      .then((response) => {
        console.log(response.data);
        navigation.navigate('home');
      })
      .catch((error) => {
        console.log(error);
        // do something with the error, e.g. show an error message
      });
  };

  if (!isAuthenticated) {
    return (
      <>
        <h2 style={{ color: 'black' }}>You need to sign in to add a new apartment.</h2>
      </>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Apartment:
          <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} />
        </label>
        <label>
          Rent:
          <input type="number" name="rent" value={formData.rent} onChange={handleInputChange} />
        </label>
        <label>
          Bed:
          <input type="number" name="bed" value={formData.bed} onChange={handleInputChange} />
        </label>
        <label>
          Bath:
          <input type="number" name="bath" value={formData.bath} onChange={handleInputChange} />
        </label>
        <label>
          Sqft:
          <input type="number" name="sqft" value={formData.sqft} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export {
  AddApartmentPage,
};