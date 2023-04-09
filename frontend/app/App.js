import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import AddApartment from './Components/AddApartment';
import HomePage from './HomePage';
import AllApartmnts from './Components/AllApartmnts';
import ApartmentView from './Components/ApartmentView';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Messages from './Components/Messages';
import Profile from './Components/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "*" element={<HomePage/>}/>
        <Route path = "/signup" element={<SignUp/>}/>
        <Route path = "/signin" element={<LogIn/>}/>
        <Route path = "/allapartments" element={<AllApartmnts/>}/>
        <Route path = "/apartmntview/:id" element={<ApartmentView/>}/>
        <Route path = "/messages" element={<Messages/>}/>
        <Route path = "/addapartment" element={<AddApartment/>}/>
        <Route path = "/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export {
  App,
};

