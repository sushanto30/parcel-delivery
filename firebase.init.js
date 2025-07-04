// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDftGcNHcgQegYph8igVoJZH1HUdgv1qk",
  authDomain: "sell-to-costomar.firebaseapp.com",
  projectId: "sell-to-costomar",
  storageBucket: "sell-to-costomar.firebasestorage.app",
  messagingSenderId: "867002923192",
  appId: "1:867002923192:web:4cdc050b55c19de518dc4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);