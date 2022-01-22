import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyD6Ddikzs_2ffeA7mMPV18KQHYhA5Pg3m8",
  authDomain: "web-chat-app-f20c3.firebaseapp.com",
  databaseURL: "https://web-chat-app-f20c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-chat-app-f20c3",
  storageBucket: "web-chat-app-f20c3.appspot.com",
  messagingSenderId: "762822930785",
  appId: "1:762822930785:web:fc065bf3b17b3a0588d520"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
