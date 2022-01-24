import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/messaging";
import "firebase/compat/storage";
import { sections } from "../components/directory/directory.data";

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
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        billing: {
          first_name: "",
          last_name: "",
          company: "",
          country: "",
          address_1: "",
          address_2: "",
          city: "",
          postcode: "",
          phone: "",
        },
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
  } else if (Notification.permission !== "denied") {
    return Notification.requestPermission().then((permission) => permission);
  }

  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    // ...
  });
};

export const uploadImages = () => {
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  const ref = storage.ref();
  sections.forEach(async (item) => {
    try {
      const itemUrl = item?.imageUrl.split("/").slice(-1)[0];
      const child = ref.child(`/${itemUrl}`);
      const data = await toDataURL(item.imageUrl);
      child.putString(data, "data_url");
    } catch (err) {
      console.log(err);
    }
  });
};
const storage = firebase.storage();
export const auth = firebase.auth();

export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
// (async () => {
//   try {
//     const batch = firestore.batch();
//     const snapShot = await firestore.collection("collections").get();
//     const lst = snapShot.docs.map((doc) => {
//       const obj = doc.data();
//       for (const item of obj.items) {
//         item.imageUrl = `/images/${item.category}/${item.imageUrl
//           .split("/")
//           .slice(-1)[0]
//           .replaceAll(item.category, "")}`;
//         console.log(item.imageUrl);
//       }
//       // batch.update(doc.ref, obj);
//       return doc;
//       //   return doc.data().items.map((item) => {
//       //     return {
//       //       ...item,
//       //       comments: [],
//       //     };
//       //   });
//     });
//     await batch.commit();
//     console.log(lst);
//   } catch (err) {
//     console.log(err);
//   }
// })();

export default firebase;
