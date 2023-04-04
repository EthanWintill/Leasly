import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import './HomePage.css';
import Navbar from './Components/Navbar';

function HomePage() {

  const navigate = useNavigate();
  {}
  const [data, setdata] = useState({
		listings:[]
	});

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/api/sublets").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
        //only one listing rn, feel free to add some
				setdata({
					listings:data
				});
        console.log(data)
			})
		);
	}, []);
  

  return (
    <div className="App">
      <div className="homeNav">
        <Navbar ></Navbar>
      </div>
      
      <div className="viewContainer">
        <div className="jumbo">
          <div className = "jumboText">
            <h2>Welcome to Leasly</h2>
            <h3>Find your dream apartment in San Marcos. Browse our listings and search for the perfect home with ease. Our friendly staff is here to help. Start your search today!</h3>
          </div>
        </div>
        {/* Carousel listing recent postings?*/}
        <ul>
          
            {data.listings.map((apartment)=>
              <div key={apartment.rent}>
                <li>{apartment.description}</li>
              </div>
            )}

        </ul>
        {/**/}
          <form action="form">
            <button type="submit">Create a New Listing</button>
          </form>
          <button className="generalBtn" type="button" onClick={()=>{navigate("/allapartments")}}>View All Apartments</button>
      </div>
    </div>
  );
}

export default HomePage;
