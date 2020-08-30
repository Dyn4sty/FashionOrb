// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD0mU-gIlw-9NVsQBH-wLDgFUu0Wwj-ZOA",
  authDomain: "fashionorb-f7827.firebaseapp.com",
  databaseURL: "https://fashionorb-f7827.firebaseio.com",
  projectId: "fashionorb-f7827",
  storageBucket: "fashionorb-f7827.appspot.com",
  messagingSenderId: "1043176176845",
  appId: "1:1043176176845:web:9cb6aa1a8c99c96fe67d84",
  measurementId: "G-GDTXZQ12SC",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null


if (messaging) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Service Worker Registered");
        messaging.useServiceWorker(registration);
      });
  }
}
