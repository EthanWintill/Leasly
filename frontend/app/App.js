import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import AddApartment from './pages/apartment/AddApartment';
import HomePage from './HomePage';
import AllApartments from './pages/apartment/AllApartmnts';
import ApartmentView from './Components/ApartmentView';
import SignUp from './pages/account/SignUp';
import LogIn from './pages/account/LogIn';
import Messages from './pages/messages/Messages';
import Profile from './pages/account/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "*" element={<HomePage/>}/>
        <Route path = "/signup" element={<SignUp/>}/>
        <Route path = "/signin" element={<LogIn/>}/>
        <Route path = "/allapartments" element={<AllApartments/>}/>
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

