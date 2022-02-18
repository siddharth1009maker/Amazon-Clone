/* eslint-disable no-unused-vars */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDkvW9c7MiWTeWXaM3kyFGuYtHZoRrt18c",
    authDomain: "clone-80a27.firebaseapp.com",
    projectId: "clone-80a27",
    storageBucket: "clone-80a27.appspot.com",
    messagingSenderId: "378179499602",
    appId: "1:378179499602:web:c55b9a4a248419dd6b918b",
    measurementId: "G-ZEBF418X7D"
  };
  //To initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db , auth};