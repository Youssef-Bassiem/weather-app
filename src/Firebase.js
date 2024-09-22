// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC59zK_SUKvB3pUVs9CwftTZ5HFHDDXJkw",
  authDomain: "weather-app-5c4d4.firebaseapp.com",
  projectId: "weather-app-5c4d4",
  storageBucket: "weather-app-5c4d4.appspot.com",
  messagingSenderId: "901992174624",
  appId: "1:901992174624:web:004cda591b27eab4711845",
  measurementId: "G-TB7TRF7ZN0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();