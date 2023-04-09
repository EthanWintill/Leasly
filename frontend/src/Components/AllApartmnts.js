import Navbar from "./Navbar";
import "./AllApartmnts.css"
import testur from "../imgs/the-outpost.jpg"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function AllApartmnts() {

    /* This will hold basic apartment information until i can put it all in a database. It's really long. Like, REALLY long... */
    const apartmentInfoTest = [
        {
            name: 'The Outpost',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: false,
            wsherDryer: true,
            furnished: false,
            rmMatching: true
        },
        {
            name: 'The Thompson',
            image: '',
            pets: false,
            pool: true,
            gym: false,
            incldUtilities: true,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: false,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Bobcat Village',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: false
        },
        {
            name: 'College Town San Marcos',
            image: '',
            pets: false,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: true,
            indvLeasing: false,
            wsherDryer: false,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Vie Lofts at San Marcos',
            image: '',
            pets: false,
            pool: false,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: false,
            rmMatching: false
        },
        {
            name: 'Dakota Ranch Student Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: false,
            wsherDryer: true,
            furnished: false,
            rmMatching: false
        },
        {
            name: 'The Grove at San marcos',
            image: '',
            pets: false,
            pool: true,
            gym: false,
            incldUtilities: true,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: false,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Uptown Square',
            image: '',
            pets: true,
            pool: false,
            gym: false,
            incldUtilities: false,
            shuttleRte: true,
            indvLeasing: false,
            wsherDryer: false,
            furnished: false,
            rmMatching: false
        },
        {
            name: 'The Junction San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },

        {
            name: 'The View on the Square',
            image: '',
            pets: false,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: false
        },
        {
            name: 'Westfield Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Village on Telluride',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Cottages at San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Lodge Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: false,
            rmMatching: true
        },
        {
            name: 'Arba',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: false,
            rmMatching: false
        },
        {
            name: 'Bishops Square',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Avenue at San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Copper Beech at San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: false
        },
        {
            name: 'Cheatham Street Flats',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: false,
            shuttleRte: false,
            indvLeasing: true,
            wsherDryer: true,
            furnished: false,
            rmMatching: false
        },
        {
            name: 'redpoint San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        }, {
            name: 'Sanctuary Lofts',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Millenium on Post',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Retreat',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Elevation on Post',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Lyndon at Springtown',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Social SMTX',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Local Downtown',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Vistas San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Oasis San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Highcrest Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Timbers',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Hill Country Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Vintage Pads Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Leah Avenue Townhomes',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        }, {
            name: 'CastleRock at San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Villagio Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Fitzroy San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Edge',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Pointe San Marcos',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Riverside Ranch',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'The Parlor',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'River Oaks Villas Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Sadler House Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Hawthorne at Blanco Riverwalk',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Springmarc',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Savannah Club Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Sutton Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        },
        {
            name: 'Mosscliff Apartments',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        }, {
            name: 'Encino Pointe',
            image: '',
            pets: true,
            pool: true,
            gym: true,
            incldUtilities: true,
            shuttleRte: true,
            indvLeasing: true,
            wsherDryer: true,
            furnished: true,
            rmMatching: true
        }]

    const [allApartmentsArr, setAllApartmentsArr] = useState({
        apartments: []
    });

    if (false) { //adds all apartments to database
        apartmentInfoTest.forEach((apartment) => {
            fetch('/api/apartments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apartment)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))
        });
    }



    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/api/apartments").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setAllApartmentsArr({
                    apartments: data
                });
            })
        );
    }, []);
    /*needs:

    -fetch call, to get the List of apartments in our database, creates an array of objects called apartmentInfo, and passes that into AllApartmentsArr()
    -apartmentInfo just needs to have the same fields as apartmentInfoTest above, that one is just to help visualize what it looks like when complete
    -to pass into setAllApartmentsArr, add setAllApartmentsArr([...apartmentInfo]) to the end of the fetch call.
    DONE, feel free to modify, I'm not sure if the way it works right now is good practice...

    
    */
    const navigate = useNavigate();
    return (
        <div className="mainContainer">
            <div className="nav">
                <Navbar ></Navbar>
            </div>

            <div className="listContainer">
                {allApartmentsArr.apartments.map((apartment) =>
                    <div className="apartmentCard" key={apartment.name}>
                        <img src={testur} alt="n/a"></img>
                        <p>{apartment.name}</p>
                        {/*on click, get the apartments name and pass that as a  prop to apartmntview.js.
                            or pass the apartments name itself to navigate("")*/}
                        {/*:id will replace /00. :id is simply the UUID for the apartment that they are clicking on */}
                        <button className="generalBtn" type="button" onClick={() => { navigate("/apartmntview/"+apartment.name) }}>More Info</button>
                    </div>)}
            </div>
        </div>
    );
}

export default AllApartmnts;
