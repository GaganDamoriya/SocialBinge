import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtqbM0oqmk1KDU2PnZOHhaT-Auk1aVHOU",
  authDomain: "egcharitywebsite.firebaseapp.com",
  projectId: "egcharitywebsite",
  storageBucket: "egcharitywebsite.appspot.com",
  messagingSenderId: "462265749224",
  appId: "1:462265749224:web:9d4c18ca0faa8e7240c35d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgDB = getStorage(app);
