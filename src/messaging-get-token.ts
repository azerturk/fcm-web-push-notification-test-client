import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const fetchFirebaseToken = () => {
  const messaging = getMessaging();
  getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }

    // This is self invoking function that listen of the notification
    const onMessageListener = (async () => {
      const messagingResolve = await messaging;
      if (messagingResolve) {
        onMessage(messagingResolve, (payload) => {
          console.log('Message received. ', payload);
        });
      }
    })();
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  })
};

export { fetchFirebaseToken };