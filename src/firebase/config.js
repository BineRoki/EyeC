import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIoLAsirj8PWIM2GeSRTmdgT2WpQM3sPQ",
  authDomain: "eyec-5dd54.firebaseapp.com",
  databaseURL:
    "https://eyec-5dd54-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eyec-5dd54",
  storageBucket: "eyec-5dd54.appspot.com",
  messagingSenderId: "3522155612",
  appId: "1:3522155612:android:5dafe06f9738e11606c299",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
