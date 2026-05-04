import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxbB-VmIZJpmcqIWGqLXHjaq5Mw-CqGv8",
  authDomain: "tutor-app-44100.firebaseapp.com",
  projectId: "tutor-app-44100",
  storageBucket: "tutor-app-44100.firebasestorage.app",
  messagingSenderId: "790538522048",
  appId: "1:790538522048:web:d6fb75dc6876e587568c25",
  measurementId: "G-Z5BXZ6ZD69"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db}
