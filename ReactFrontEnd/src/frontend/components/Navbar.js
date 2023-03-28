import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate()

    const toggleDropdown = () => {
        document.querySelector(".dropdownContent").classList.toggle("show");
    }

    window.onclick = function(event) {
        if (!event.target.matches('.material-symbols-outlined')) {
            if(document.querySelector(".dropdownContent") && document.querySelector(".dropdownContent").classList.contains("show"))
            document.querySelector(".dropdownContent").classList.toggle("show");
        }
      } 

    return (
      <div className="navContainer">
        <h1 onClick={()=>navigate("/")}> Leasly</h1>
        <div className="accountIcon">
            
            <div className="logInDiv">
                 
                    <div className="dropdown">
                        <button onClick={()=>{toggleDropdown()}} className="accntBtn"><span className="material-symbols-outlined"> account_circle </span></button>
                            <div id="myDropdown" className="dropdownContent">
                                {/* These are placeholders but their functions are easy to deduce. Components/ pages will need to be made for each drop down option*/}
                                <button type="button" className="dropdownProfile" onClick={()=>{navigate("/")}}>Profile</button>
                                <button type="button" className="dropdownMessages" onClick={()=>{navigate("/")}} >Messages</button>
                                <button type="button" className="dropdownSignout" >Sign Out</button>
                            </div>
                    </div> 
                </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  