import Navbar from "./Navbar"
import React, { useState, useEffect } from 'react';
import { auth } from "../FirebaseFuncs";

const Profile = () => {

    const [data, setdata] = useState({
        listings: []
    });

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/api/sublets?user=" + auth.currentUser.uid).then((res) =>
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
            <div>
                <Navbar></Navbar>
            </div>
            <h1 style={{color: 'black'}}>Your listings</h1>
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

export default Profile