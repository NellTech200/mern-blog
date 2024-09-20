// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  // we use import.meta just because we used react with vite.
  // otherwise if we used create react app, we would have been talking of process.env

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5bdfc.firebaseapp.com",
  projectId: "mern-blog-5bdfc",
  storageBucket: "mern-blog-5bdfc.appspot.com",
  messagingSenderId: "980044682593",
  appId: "1:980044682593:web:d6265354b7bcb19340e120"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
