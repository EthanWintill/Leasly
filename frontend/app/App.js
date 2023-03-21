import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import axios from 'axios';

export default function App() {
  const [getMessage, setGetMessage] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then((response) => {
      console.log('SUCCESS', response);
      setGetMessage(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
