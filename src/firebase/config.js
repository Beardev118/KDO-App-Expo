import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlEWCUsQiWWFpTLgblOsM4dSifSSjBKsc",
  authDomain: "kdojde.firebaseapp.com",
  databaseURL: "https://kdojde.firebaseio.com",
  projectId: "kdojde",
  storageBucket: "gs://kdojde.appspot.com",
  messagingSenderId: "102235657074",
  appId: "1:102235657074:android:6c3402d2d1219a35"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
