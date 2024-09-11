
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhqIA7uCUe7svlXquAt5X3PCTE16Pc1VA",
  authDomain: "react-e-commerce-a3b67.firebaseapp.com",
  projectId: "react-e-commerce-a3b67",
  storageBucket: "react-e-commerce-a3b67.appspot.com",
  messagingSenderId: "266373313863",
  appId: "1:266373313863:web:b99cb4bf035e8a50404862",
  measurementId: "G-1X72141C13"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {
    auth,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
}