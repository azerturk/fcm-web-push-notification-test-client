// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js";

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

export async function requestPermission() {

  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve a registration token for use with FCM.

    /*       const registrationRemove = await navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
          }); */

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    // Wait for serviceWorker.ready
    await navigator.serviceWorker.ready

    getToken(messaging, { serviceWorkerRegistration: registration, vapidKey: process.env.REACT_APP_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }

      onMessage(messaging, (payload) => {
        console.log('Foreground Message received: ', payload);
      });

      /* navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!",
          tag: "vibration-sample",
        });
      }); */
    });
  }

  return permission;
}

//requestPermission();