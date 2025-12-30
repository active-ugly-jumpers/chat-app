import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnOcbLwO-fTmEVtDdh2dV-qS-HIqoYNgc",
  authDomain: "chat-app-93611.firebaseapp.com",
  projectId: "chat-app-93611",
  storageBucket: "chat-app-93611.firebasestorage.app",
  messagingSenderId: "57990901026",
  appId: "1:57990901026:web:8098e237eed28cf547897b"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
export const storage = firebase.storage();
