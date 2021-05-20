import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCoKl8-Vldf6xh_RQO76DonYrCPOly09OU",
    authDomain: "lab2-is.firebaseapp.com",
    databaseURL: "https://lab2-is-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lab2-is",
    storageBucket: "lab2-is.appspot.com",
    messagingSenderId: "970209115916",
    appId: "1:970209115916:web:0b46ad7e121edb43c2d329",
    measurementId: "G-RV02SSWLPL"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export { firebase };