import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBrJCOiRviHT0urMH3GYqurfnCrJfaj_2w",
    authDomain: "teste-crud-react.firebaseapp.com",
    databaseURL: "https://teste-crud-react.firebaseio.com",
    projectId: "teste-crud-react",
    storageBucket: "teste-crud-react.appspot.com",
    messagingSenderId: "19570441923",
    appId: "1:19570441923:web:d01d0f6b7e07f251de2c76"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
