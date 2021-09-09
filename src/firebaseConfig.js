import firebase from "firebase";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB3_FTZtABmiWbFCZcB8e_1BHwKd-E0vP0",
    authDomain: "project2-80ddb.firebaseapp.com",
    projectId: "project2-80ddb",
    storageBucket: "project2-80ddb.appspot.com",
    messagingSenderId: "721155902228",
    appId: "1:721155902228:web:268a6be07bbc2294d1d001"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
