import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwIqtL4qO-mzsx6CrhRHZ8IbiR6_FbMao",
  authDomain: "fermif-4ffdc.firebaseapp.com",
  databaseURL: "https://fermif-4ffdc-default-rtdb.firebaseio.com",
  projectId: "fermif-4ffdc",
  storageBucket: "fermif-4ffdc.appspot.com",
  messagingSenderId: "690943347236",
  appId: "1:690943347236:web:a6f86597c7f469332026b1",
  measurementId: "G-NSWJFYE19H"
};

// Initialize Firebase
// eslint-disable-next-line 
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
  .then((result) => {
      const user = result.user;
      const body = {
        id: user.uid,
        email: user.email,
        name: user.displayName
      };
      fetch('http://localhost:5001/user/create', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8",}
      })
      .then(response => response.json())
      .catch(err => console.log(err));
      // ...
  }).catch((error) => {console.log(error);});
}

export const signOutwithGoogle = async () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
  });
}
