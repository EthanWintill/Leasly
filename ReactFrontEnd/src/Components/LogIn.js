import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../FirebaseFuncs";
const LogIn =() =>{
    const navigate = useNavigate();
    

    const logIn = () =>{

        signInWithEmailAndPassword(auth, document.querySelector("#email").value,document.querySelector("#password").value)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            navigate("/")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode +": " + errorMessage)
            document.querySelector("#errorField").innerHTML= "Please enter a valid email and password";
        });

    }

    return(
        <div id="mainContainer">
            <div id="signContainer">
                <h1>Log In</h1>
                <input type="text" id="email" placeholder="Enter email"></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <button type="button" id="logInBtn" onClick={()=>{logIn()}}>LogIn!</button>
                <span id="error-field"> </span>
            </div>
            <a href="/"> go home</a>
        </div>
    );
}

export default LogIn