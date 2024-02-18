// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAFe5DI3PP2DjkDMIs5drPHX4nNNyZtbrA",
  authDomain: "mlbapiwebapplication.firebaseapp.com",
  projectId: "mlbapiwebapplication",
  storageBucket: "mlbapiwebapplication.appspot.com",
  messagingSenderId: "774448147330",
  appId: "1:774448147330:web:c9c4e0c003dd2c5291fd9b",
  measurementId: "G-NCYPS9FN5X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);
