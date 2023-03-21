import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';

import {Theme} from './Theme';

import HomePage from './pages/HomePage';

const Stack = createNativeStackNavigator();

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
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export {App};
