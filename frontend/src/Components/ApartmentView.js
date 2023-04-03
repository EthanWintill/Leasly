import Navbar from "./Navbar"

const ApartmentView = ({selectedApartment}) => {

        {/*needs api call to flask backend, gets apartment name in json format, then renders page with apartments info such as listings and ammenities */}
        return(
            <div>
                <Navbar></Navbar>
                <p>This will take a bit to make, will display apartment based on the name of the prop that is passed through.</p>
            </div>
        )

}

export default ApartmentView