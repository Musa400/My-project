// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpyxwZjKrBvsMs7V44w2UpLvAXXqs1Y0M",
  authDomain: "mern-estate-8d5a4.firebaseapp.com",
  projectId: "mern-estate-8d5a4",
  storageBucket: "mern-estate-8d5a4.firebasestorage.app",
  messagingSenderId: "1063983020043",
  appId: "1:1063983020043:web:b0906eef10449a4dcf2f0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);