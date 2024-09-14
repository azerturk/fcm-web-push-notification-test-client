importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js');

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());

  const resultData = e.data.json().data;
  const notificationTitle = resultData.body;
  const notificationOptions = {
    body: resultData.body,
    icon: "",
    tag: "",
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});