// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCGRxMojkBYS-0miEwr3ALDXcxS4f-08wc",
    authDomain: "clone-challenge-528a1.firebaseapp.com",
    databaseURL: "https://clone-challenge-528a1.firebaseio.com",
    projectId: "clone-challenge-528a1",
    storageBucket: "clone-challenge-528a1.appspot.com",
    messagingSenderId: "601954548536",
    appId: "1:601954548536:web:a4cf438e55a6f833e4dfcd",
    measurementId: "G-ZQH769FYNW"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //firestore is a realtime database of firebase
  const db = firebaseApp.firestore();

  //this gives us a variable auth which help us to handle all sign in and everthing like that
  const auth = firebase.auth();

  export {db,auth};