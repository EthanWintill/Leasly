import {useNavigate} from 'react-router-dom';
import {auth, createUserWithEmailAndPassword} from '../FirebaseFuncs';
const SignUp = () =>{
  const navigate = useNavigate();


  const SignUp = () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const data = {
            email: email,
            password: password,
            username: username,
            userId: userCredential.user.uid, // add user ID to data object
          };

          fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigate('/');
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ': ' + errorMessage);
          document.querySelector('#errorField').innerHTML = 'Please enter a valid email and password';
        });
  };


  return (
    <div id="mainContainer">
      <div id="signContainer">
        <h1>Sign up</h1>
        <input type="text" id="email" placeholder="Enter email" />
        <input type="text" id="username" placeholder="Enter your Username" />
        <input type="password" id="password" placeholder="Enter pasword" />
        <button type="button" id="createBtn" onClick={()=>{
          SignUp();
        }}>Sign Up!</button>
        <div id="signInLink">
          <a href="/" >Cancel</a>
        </div>
        <span id="error-field"> </span>
      </div>
    </div>
  );
};

export default SignUp;
