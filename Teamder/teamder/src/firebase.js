// Import the functions you need from the SDKs you need
import firebase from "firebase"
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
{/* <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script> */ }
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1nrp6ncQU79Mh9RSz5QbxfMzAQ1Dyigo",
    authDomain: "teamder-e3717.firebaseapp.com",
    projectId: "teamder-e3717",
    storageBucket: "teamder-e3717.appspot.com",
    messagingSenderId: "347086782423",
    appId: "1:347086782423:web:751e59daed1e04e8e09592",
    measurementId: "G-KSRMVNG5KZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();

export default database;