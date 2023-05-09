// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getMessaging} from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuFCy2ZcKZsJOe49QNFVNwC7HEC64mTdo",
  authDomain: "otp-project-c74fb.firebaseapp.com",
  projectId: "otp-project-c74fb",
  storageBucket: "otp-project-c74fb.appspot.com",
  messagingSenderId: "268765073491",
  appId: "1:268765073491:web:9046d0db6de5f1fa93b6a6",
  measurementId: "G-CT0MBLB6DV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app)
export const auth = getAuth(app)