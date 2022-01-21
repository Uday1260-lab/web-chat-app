// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyD6Ddikzs_2ffeA7mMPV18KQHYhA5Pg3m8",
  authDomain: "web-chat-app-f20c3.firebaseapp.com",
  databaseURL: "https://web-chat-app-f20c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-chat-app-f20c3",
  storageBucket: "web-chat-app-f20c3.appspot.com",
  messagingSenderId: "762822930785",
  appId: "1:762822930785:web:fc065bf3b17b3a0588d520"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();