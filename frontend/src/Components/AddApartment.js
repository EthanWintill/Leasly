import { useState, useEffect } from "react";
import { auth } from "../FirebaseFuncs";
import { useNavigate } from "react-router-dom";

function addApartment() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);


    const add = () => {

        const formdata = new FormData(document.querySelector("#form"));
        const data = Object.fromEntries(formdata.entries());
        data['user_id'] = auth.currentUser.uid


        console.log(data)


        fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate('/')
            })
            .catch((error) => { console.log(error); });

    }

    if (!isAuthenticated) {
        return (
            <div>
                <h2 style={{color: 'black'}}>You need to sign in to add a new apartment.</h2>
            </div>
        );
    } else {
        return (
            <div id="mainContainer">
                <div id="signContainer">
                    <h1>Add apartment</h1>
                    <form id='form'>
                        <input type="text" name="apartment" placeholder="Enter Apartment Name"></input>
                        <input type="text" name="description" placeholder="Enter description"></input>
                        <input type="text" name="beds" placeholder="Enter number of beds"></input>
                        <input type="text" name="baths" placeholder="Enter number of baths"></input>
                        <input type="text" name="rent" placeholder="Enter rent"></input>
                        <input type="text" name="location" placeholder="Enter location"></input>
                        <input type="text" name="sqft" placeholder="Enter square footage"></input>
                    </form>
                    <button type="button" id="createBtn" onClick={() => { add() }}>Add!</button>
                    <div id="signInLink">
                        <a href="/" >Cancel</a>
                    </div>
                    <span id="error-field"> </span>
                </div>
            </div>
        );
    }
}
export default addApartment