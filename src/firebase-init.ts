// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { fetchFirebaseToken } from "./messaging-get-token";
import { getMessaging } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/firebase-cloud-messaging-push-scope" })

      // TODO(developer): Retrieve a registration token for use with FCM.
      fetchFirebaseToken();


      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!",
          tag: "vibration-sample",
        });
      });
    }
  });
}

requestPermission();

// This is self invoking function that listen of the notification
const onMessageListener = (async () => {
  console.log("dsds");
  const messagingResolve = await messaging;
  if (messagingResolve) {
    onMessage(messagingResolve, (payload) => {
      console.log('Message received. ', payload);
    });
  }
})();