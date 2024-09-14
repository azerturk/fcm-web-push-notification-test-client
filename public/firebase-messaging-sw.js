// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");

// Initialize Firebase inside the service worker
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "", // You can change this to your app's icon
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
