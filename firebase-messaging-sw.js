// ================================================================
// Firebase Cloud Messaging Service Worker
// ================================================================
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCHYBEd8L4YTZHdWAyMDjK_kyVCjMe2K5c",
  authDomain: "ittisal-2f6cc.firebaseapp.com",
  projectId: "ittisal-2f6cc",
  storageBucket: "ittisal-2f6cc.firebasestorage.app",
  messagingSenderId: "880476684053",
  appId: "1:880476684053:web:b22e37a7f1d638f215f31c"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Ittisal';
const notificationOptions = {
  body: payload.notification?.body || 'New message',
  icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiI+PHJlY3Qgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIHJ4PSI0MiIgZmlsbD0iIzE2NzdmZiIvPjx0ZXh0IHg9Ijk2IiB5PSIxMjAiIGZvbnQtc2l6ZT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7wn5KsPC90ZXh0Pjwvc3ZnPg==',
  badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iMjQiIGZpbGw9IiMxNjc3ZmYiLz48L3N2Zz4=',
  tag: 'ittisal-message',
  renotify: true,
  requireInteraction: true,
  sound: '/ChatPro/notification.mp3',   // ⚠️ এই লাইনটি যোগ করুন
  vibrate: [200, 100, 200],              // ⚠️ কম্পন যোগ করুন
  data: payload.data || {}
};

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
