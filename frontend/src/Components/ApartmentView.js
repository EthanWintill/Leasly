import Navbar from "./Navbar"
import { useParams } from "react-router-dom";

const ApartmentView = () => {
        const {id} = useParams();
        /*needed functions
            - api call to flask backend, gets apartment based on a search for id, returns this in json format, then renders page with apartments info such as listings and ammenities 
            - section that lists all sublistings on this apartment
            - button to send message to user to inquire about sublease
            - button to post a subleasing, redirects to sublease button from HomePage.


        */
        return(
            <div>
            {/* HTML CSS Needs:
            
            -make layout to display all relevant info (Apartment, name, amenities etc)
            -make section for available subleases for apartment
            -make buttons for needed function reqs above
            -make it look pretty.
            */}
                <Navbar></Navbar>
                <p>This will take a bit to make, will display apartment based on the name of the prop that is passed through.</p>
                <p>{id}</p>
            </div>
        )

}

export default ApartmentView