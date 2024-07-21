// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "training-diary-e5a05",
  storageBucket: "training-diary-e5a05.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: process.env.VAPID_KEY,
  });

  if (token) {
    console.log("token", token);
  } else {
    console.log("Can't get token");
  }

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
}

requestPermission();