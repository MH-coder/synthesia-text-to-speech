import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDZffpM8UcQQUD1lSPl_JAIdNJgmwtB--A",
  authDomain: "aiclassroom-2c0f1.firebaseapp.com",
  projectId: "aiclassroom-2c0f1",
  storageBucket: "aiclassroom-2c0f1.appspot.com",
  messagingSenderId: "153430048040",
  appId: "1:153430048040:web:9e88548761f9dca648641d",
  measurementId: "G-9E4RDSR11P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}