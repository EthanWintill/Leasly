import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../../FirebaseFuncs";
const SignUp =() =>{
    const navigate = useNavigate();
    

    const SignUp = () =>{

        createUserWithEmailAndPassword(auth, document.querySelector("#email").value,document.querySelector("#password").value)
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
                <h1>Sign up</h1>
                <input type="text" id="email" placeholder="Enter email"></input>
                <input type="text" id="username" placeholder="Enter your Username"></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <button type="button" id="createBtn" onClick={()=>{SignUp()}}>Sign Up!</button>
                <div id="signInLink">
                    <a href="/" >Cancel</a>
                </div>
                <span id="error-field"> </span>
            </div>
        </div>
    );
}

export default SignUp