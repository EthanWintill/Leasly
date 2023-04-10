// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAEbR_SVKEXp6Edy3xIyP5imMKTsw0vak",
  authDomain: "leasly-388c5.firebaseapp.com",
  projectId: "leasly-388c5",
  storageBucket: "leasly-388c5.appspot.com",
  messagingSenderId: "278734809023",
  appId: "1:278734809023:web:02cb1ee36625da4e37a30a",
  measurementId: "G-2BV84V79TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)

const db = getFirestore(app)

export {app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, db}