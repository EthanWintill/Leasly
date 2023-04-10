import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  auth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from '../FirebaseFuncs';
import {Divide as Hamburger} from 'hamburger-react';

import './Navbar.css';

export default function Navbar(props) {
  const {navigation} = props;

  const toggleDropdown = () => {
    document.querySelector('.dropdownContent').classList.toggle('show');
  };
  {/* toggles whether or not to show the dropdown menu */}
  window.onclick = function(event) {
    if (!event.target.matches('.material-symbols-outlined')) {
      if (document.querySelector('.dropdownContent') && document.querySelector('.dropdownContent').classList.contains('show')) {
        document.querySelector('.dropdownContent').classList.toggle('show');
      }
    }
  };

  const signOutClick = () =>{
    signOut(auth).catch((error)=>{
      console.log(error);
    });
    navigation.navigate('home');
  };

  const testActSignIn = () =>{
    signInWithEmailAndPassword( auth, 'aguestaccount@gmail.com', 'atest123').catch(()=>{
      errorDisplay.innerHTML = 'Test Account not available, please try again later!';
    });
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        document.querySelector('.dropdown-log').style.display = 'none';
        document.querySelector('.dropdown').style.display = 'flex';
      } else {
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.dropdown-log').style.display = 'inline-block';
      }
    });
  }, []);


  return (
    <div className="navContainer">
      <h1 onClick={()=>navigation.navigate('home')}> Leasly</h1>
      <div className="accountIcon">

        <div className="accountDiv">
          {/* If user is found to not be signed in, it will display options to log in or create an account. If they are signed in, then it will display the account icon.*/}
          <div className="dropdown-log">
            <button type="button" onClick={() => {
              navigation.navigate('signin');
            }}>Log In</button>
            <button type="button" onClick={()=>{
              navigation.navigate('signup');
            }}>Create An Account</button>
            <button type="button" onClick={()=> {
              testActSignIn();
            }}>Sign into test Account</button>
          </div>

          <div className="dropdown">
            <button onClick={()=>{
              toggleDropdown();
            }} className="accntBtn"><span className="material-symbols-outlined"> account_circle </span></button>
            <div id="myDropdown" className="dropdownContent">
              {/* These are placeholders but their functions are easy to deduce. Components/ pages will need to be made for each drop down option*/}
              <button type="button" className="dropdownProfile" onClick={()=>{
                navigation.navigate('profile');
              }}>Profile</button>
              <button type="button" className="dropdownMessages" onClick={()=>{
                navigation.navigate('messages');
              }} >Messages</button>
              <button type="button" className="dropdownSignout" onClick={()=>{
                signOutClick();
              }}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  Navbar,
};

