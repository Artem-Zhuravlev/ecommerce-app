/* eslint-disable no-unused-vars */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfQaVKk8svNEQz3uA2Az6T2H3b39ZMA6o",
  authDomain: "ecommerce-a5eda.firebaseapp.com",
  projectId: "ecommerce-a5eda",
  storageBucket: "ecommerce-a5eda.appspot.com",
  messagingSenderId: "881403134185",
  appId: "1:881403134185:web:4bc7beae753d89276cf078",
  measurementId: "G-0FP5GSBN7H"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();