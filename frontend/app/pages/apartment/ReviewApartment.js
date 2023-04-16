import React, { useState } from 'react';
import {auth} from '../../util/FirebaseFuncs';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



export default function ReviewApartment() {
  const route = useRoute();
  const { ApartmentName } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();


  const handleSubmit = () => {
    const data = {
      userId: auth.currentUser.displayName,
      apartment: ApartmentName,
      rating: rating,
      comment: comment
    };
    console.log(data);
    fetch('https://leaslybackend.herokuapp.com/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        //navigation.navigate('viewApartment', {ApartmentName}); This doesn't work please fix it :'(
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  return (
    <div>
      <p> comments</p>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <p> rating </p>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      <button type="button" onClick={handleSubmit}>Submit Review!</button>
    </div>
  );
}
