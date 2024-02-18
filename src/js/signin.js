import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
//import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

//signInWithEmailAndPassword(auth, email, password)

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
//const db = getFirestore(app);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);

const signInTF = false;

document
  .getElementById("sign-in-button")
  .addEventListener("click", function () {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    console.log(email);
    console.log(password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //console.log(user);
        //signInTF = true;
        console.log("signed in!");

        window.location.href = "index.html";
      })
      .catch((error) => {
        console.log("Incorrect Email or Password");
        alert("Incorrect Email or Password");
        // const badSignin = document.createElement("div");
        // badSignin.classList.add("badSignin-Container");
        // badSignin.innerHTML = `<div id="badSigninAlert" >Incorrect Email or Password</div>`;
        //alert("Incorrect Email or Password");
      });
  });
