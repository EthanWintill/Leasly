import Navbar from "./Navbar"
import React, { useState, useEffect } from 'react';
import testur from "../imgs/the-outpost.jpg";
import { useParams } from "react-router-dom";
import AptmntReviews from "./AptmntReviews"
import AptmntSubleaseBoard from "./AptmntSubleaseBoard";
import './ApartmentView.css'

const ApartmentView = () => {
    const { id } = useParams();
    const [data, setdata] = useState({
        listings: [{}]
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
            -make buttons for needed function reqs above
            -make it look pretty.
            */}
            <Navbar></Navbar>
            <div className="aptmntViewContainer">
                        
                        <div className="apartmentInfoContainer">
                            
                                <img className="apartmentImage" src={testur}></img>
                            
                            <div className="apartmentInfo">
                                <p className="apartmentName"> {id}</p>
                                <p> rating</p>
                                <p> 4.5/5</p>
                                <p> apartment link</p>
                                <a> a link to the apartment website </a>
                                <p> (512) - 512-5123</p>
                                <p> amenities</p>
                                <div className="amenitiesContainer">
                                    {/* 9 divs acting as cards, one for each amenitie, arranged in a flex container*/}
                                    <div>
                                        <span class="material-symbols-outlined"> pets </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> spa </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> sports_gymnastics </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> water_ec </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> directions_bus </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> self_improvement </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> local_laundry_service </span>
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined"> bed </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subleaseViewContainer">
                            <AptmntSubleaseBoard identifier={data.listings}/>
                        </div>
                        
                        <div className="reviewViewContainer">
                            <AptmntReviews identifier={id}/>
                        </div>
                        
                    </div>
        </div>
    )

}

export default ApartmentView