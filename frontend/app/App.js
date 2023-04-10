import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginPage from './pages/account/LoginPage';
import ProfilePage from './pages/account/ProfilePage';
import SignupPage from './pages/account/SignupPage';
import AddApartmentPage from './pages/apartment/AddApartmentPage';
import ApartmentListPage from './pages/apartment/ApartmentListPage';
import ApartmentView from './pages/apartment/ApartmentView';
import HomePage from './pages/home/HomePage';
import Messages from './pages/messages/Messages';
import Navbar from './components/Navbar';

import {Theme} from './Theme';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={Theme}>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SigninPage"
          screenOptions={{
            // eslint-disable-next-line react/no-unstable-nested-components
            header: (props) => <Navbar {...props} />,
            headerBackVisible: false,
          }}>
          <Stack.Screen name="home" component={HomePage}/>
          <Stack.Screen name="signin" component={LoginPage}/>
          <Stack.Screen name="profile" component={ProfilePage}/>
          <Stack.Screen name="signup" component={SignupPage}/>
          <Stack.Screen name="addApartment" component={AddApartmentPage}/>
          <Stack.Screen name="allApartments" component={ApartmentListPage}/>
          <Stack.Screen name="viewApartment" component={ApartmentView}/>
          <Stack.Screen name="messages" component={Messages}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export {
  App,
};

