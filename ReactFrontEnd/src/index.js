import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import AllApartmnts from './frontend/components/AllApartmnts';
import ApartmentView from './frontend/components/ApartmentView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<App/>}/>
      <Route path = "*" element={<App/>}/>
      <Route path = "/allapartments" element={<AllApartmnts/>}/>
      <Route path = "/apartmntview" element={<ApartmentView/>}/>
    </Routes>
  </BrowserRouter>,
);


