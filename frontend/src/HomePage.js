import {useNavigate} from "react-router-dom"
import './HomePage.css';
import Navbar from './Components/Navbar';

function HomePage() {

  const navigate = useNavigate();
  {/*needs an api call to flask backend to call recent postings from server? */}
  const listings = [
    {
        'description': 'This studio apartment is perfect for a single person or couple. It features a comfortable bed, a fully equipped kitchen, and a modern bathroom. Located in a quiet neighborhood with easy access to public transportation.',
        'bedrooms': 1,
        'bathrooms': 1,
        'rent':1000,
        'location':"san marcos",
        'sqft': 500,
        'image': 'AIroom.png'
    },
    {
        'description': 'This beautiful house is perfect for families or groups. It features three bedrooms, two bathrooms, a large living room, and a fully equipped kitchen. The house is located in a quiet, tree-lined neighborhood with easy access to shopping and dining.',
        'bedrooms': 3,
        'bathrooms': 2,
        'rent':5000,
        'location':'houston',
        'sqft': 2000,
        'image': 'AIroom.png'
    },
  ]
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
          
            {listings.map((apartment)=>
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
