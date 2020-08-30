import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyD0mU-gIlw-9NVsQBH-wLDgFUu0Wwj-ZOA",
  authDomain: "fashionorb-f7827.firebaseapp.com",
  databaseURL: "https://fashionorb-f7827.firebaseio.com",
  projectId: "fashionorb-f7827",
  storageBucket: "fashionorb-f7827.appspot.com",
  messagingSenderId: "1043176176845",
  appId: "1:1043176176845:web:9cb6aa1a8c99c96fe67d84",
  measurementId: "G-GDTXZQ12SC",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // Creating user in db
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
    const lastSignInTime = new Date();
    await userRef.update({
      lastSignInTime,
    });
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  ObjectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  ObjectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(obj.title);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (CollectionSnapShot) => {
  const transformedCollection = CollectionSnapShot.docs.map(
    (documentSnapShot) => {
      const { title, items } = documentSnapShot.data();
      const { id } = documentSnapShot;
      return {
        title,
        routeName: encodeURI(title.toLowerCase()),
        items,
        id,
      };
    }
  );
  return transformedCollection.reduce((accumlator, collection) => {
    accumlator[collection.title.toLowerCase()] = collection;
    return accumlator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export const subscribeToNotifications = () => {
  const messaging = firebase.messaging.isSupported()
    ? firebase.messaging()
    : null;
    
  if (!messaging) {
    return;
  }
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    /// do smth
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        // do smth
      }
    });
  }
  messaging.usePublicVapidKey(
    "BE-AmK0DgiR7FoX88JQJMqlGVhunDhzpo4PjlX27hyJQ5fbgkJkhX9qM4gM1_yHNZH7JNVmIamZkRbntXT55n7k"
  );

  // Let's check whether notification permissions have already been granted

  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    // ...
  });
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
