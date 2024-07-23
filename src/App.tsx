import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './firebase-init';
import { getMessaging, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';

function App() {

  const messaging = getMessaging();

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });

    onBackgroundMessage(messaging, (payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
      };

      //self.registration.showNotification(notificationTitle, notificationOptions);
    });
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
