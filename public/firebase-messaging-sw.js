// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");

// Initialize Firebase inside the service worker
const firebaseConfig = {
  apiKey: "AIzaSyAp4KFoOmqph7rhxKPGk8U0vokikcvmOQ0",
  authDomain: "test-fcm-1f216.firebaseapp.com",
  projectId: "test-fcm-1f216",
  storageBucket: "test-fcm-1f216.appspot.com",
  messagingSenderId: "37178266676",
  appId: "1:37178266676:web:41f22f0483d74c9baf2661",
  measurementId: "G-GMMBHKRQDS",
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
