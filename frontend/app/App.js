import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {NativeBaseProvider} from 'native-base';
import '../index.js';

import {Theme} from './Theme';

import HomePage from './pages/home/HomePage';
import AddApartment from './pages/apartment/AddApartment';
import AllApartments from './pages/apartment/AllApartments';
import ApartmentView from './pages/apartment/ApartmentView';
import SignupPage from './pages/account/SignupPage';
import LoginPage from './pages/account/LoginPage';
import Messages from './pages/messages/Messages';
import Profile from './pages/account/Profile';

export default function App() {
  return (

    <NativeBaseProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage/>}/>
          <Route path = "*" element={<HomePage/>}/>
          <Route path = "/signup" element={<SignupPage/>}/>
          <Route path = "/signin" element={<LoginPage/>}/>
          <Route path = "/allapartments" element={<AllApartments/>}/>
          <Route path = "/apartmntview/:id" element={<ApartmentView/>}/>
          <Route path = "/messages" element={<Messages/>}/>
          <Route path = "/addapartment" element={<AddApartment/>}/>
          <Route path = "/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </NativeBaseProvider>
  );
}
export {
  App,
};

