// database/firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6IC2aQvyu7qxZKdDc1qcViDDpPjghF_k",
  authDomain: "furnitureland-60541.firebaseapp.com",
  projectId: "furnitureland-60541",
  storageBucket: "furnitureland-60541.appspot.com",
  messagingSenderId: "1028379167451",
  appId: "1:1028379167451:web:65d9ee21d5e57767659afe",
  measurementId: "G-PVMPTQ98JC"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default firebase;