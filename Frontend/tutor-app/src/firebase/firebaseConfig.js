import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "",
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
const googleProvider = new  GoogleAuthProvider();

export {app, auth, googleProvider};
