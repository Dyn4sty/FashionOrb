import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyD0mU-gIlw-9NVsQBH-wLDgFUu0Wwj-ZOA",
    authDomain: "fashionorb-f7827.firebaseapp.com",
    databaseURL: "https://fashionorb-f7827.firebaseio.com",
    projectId: "fashionorb-f7827",
    storageBucket: "fashionorb-f7827.appspot.com",
    messagingSenderId: "1043176176845",
    appId: "1:1043176176845:web:9cb6aa1a8c99c96fe67d84",
    measurementId: "G-GDTXZQ12SC"
  };
  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;