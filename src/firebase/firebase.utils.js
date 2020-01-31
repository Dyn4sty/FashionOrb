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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;