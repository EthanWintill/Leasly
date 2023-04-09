import Navbar from "./Navbar"
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const ApartmentView = () => {
    const { id } = useParams();
    const [data, setdata] = useState({
        listings: []
    });
    /*needed functions
        - api call to flask backend, gets apartment based on a search for id, returns this in json format, then renders page with apartments info such as listings and ammenities 
        - section that lists all sublistings on this apartment
        - button to send message to user to inquire about sublease
        - button to post a subleasing, redirects to sublease button from HomePage.


    */
    console.log(id)
    useEffect(() => {
        fetch("/api/sublets?apartment=" + id).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                // only one listing rn, feel free to add some
                setdata({
                    listings: data
                });
                console.log(data)
            })
        );
    }, []);
    return (
        <div>
            {/* HTML CSS Needs:
            
            -make layout to display all relevant info (Apartment, name, amenities etc)
            -make section for available subleases for apartment
            -make buttons for needed function reqs above
            -make it look pretty.
            */}
            <Navbar></Navbar>
            <p>This will take a bit to make, will display apartment based on the name of the prop that is passed through.</p>
            <h1 style={{color: 'black'}}>{id}</h1>
            <div className="listings">
                <ul>

                    {data.listings.map((sublet) =>
                        <div key={sublet.rent}>
                            <li>Listing description: {sublet.description}</li>
                        </div>
                    )}

                </ul>

            </div>
        </div>
    )

}

export default ApartmentView