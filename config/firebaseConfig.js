
// Import Firebase core and required services (database, storage)
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

// Firebase project configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBnOcbLwO-fTmEVtDdh2dV-qS-HIqoYNgc",
  authDomain: "chat-app-93611.firebaseapp.com",
  projectId: "chat-app-93611",
  storageBucket: "chat-app-93611.firebasestorage.app",
  messagingSenderId: "57990901026",
  appId: "1:57990901026:web:8098e237eed28cf547897b"
};

// Initialize Firebase app if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase Realtime Database and Storage instances
export const database = firebase.database();
export const storage = firebase.storage();
